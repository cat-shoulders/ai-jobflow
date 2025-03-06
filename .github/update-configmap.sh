#!/bin/bash
set +x
SECRETS_JSON=$1
[ -z "$SECRETS_JSON" ] && echo "Error: No secrets JSON provided" && exit 1

SECRETS_ARRAY=()
while read key; do
  value=$(echo "$SECRETS_JSON" | jq -r ".[\"$key\"]")
  secret_key=$(echo $key | sed 's/^ENV_//')
  SECRETS_ARRAY+=("$secret_key=$value")
done < <(echo "$SECRETS_JSON" | jq -r 'keys[] | select(startswith("ENV_"))')

if ! yq -e '.secretGenerator' ./k8s/kustomization.yaml >/dev/null 2>&1; then
  yq -i '.secretGenerator = [{"name": "app-secrets", "literals": []}]' ./k8s/kustomization.yaml
fi

for secret in "${SECRETS_ARRAY[@]}"; do
  yq -i ".secretGenerator[0].literals += [\"$secret\"]" ./k8s/kustomization.yaml
done

TEMP_ARRAY=$(yq -o=json '.secretGenerator[0].literals' ./k8s/kustomization.yaml | jq -c 'unique')
yq -i ".secretGenerator[0].literals = $TEMP_ARRAY" ./k8s/kustomization.yaml