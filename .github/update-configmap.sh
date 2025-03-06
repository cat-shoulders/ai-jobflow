#!/bin/bash

# Script to extract GitHub secrets with ENV_ prefix and add them to kustomization.yaml
# Handles security concerns by not exposing secrets in logs

# Disable command output to prevent secret exposure
set +x

echo "::group::Processing environment variables"
echo "Adding ENV_ secrets to ConfigMap..."

# Create a temp file for the updated literals section
touch /tmp/literals-temp.txt

# Extract existing literals section (if any)
if grep -q "literals:" ./k8s/kustomization.yaml; then
  sed -n '/literals:/,/^[^ ]/p' ./k8s/kustomization.yaml | grep -v "literals:" | grep -v "^[^ ]" >>/tmp/literals-temp.txt
fi

# Get all ENV_ secrets from environment variables (passed in by caller)
for var in $(env | grep '^ENV_' | cut -d= -f1); do
  config_key=$(echo "$var" | sed 's/^ENV_//')
  config_value="${!var}"
  echo "      - $config_key=$config_value" >>/tmp/literals-temp.txt
done

# Update kustomization.yaml with the new literals section
sed -i '/literals:/,/^[^ ]/{ /literals:/b; /^[^ ]/b; d }' ./k8s/kustomization.yaml
sed -i '/literals:/ r /tmp/literals-temp.txt' ./k8s/kustomization.yaml

rm /tmp/literals-temp.txt
echo "ConfigMap updated with $(grep -c '    - ' ./k8s/kustomization.yaml) environment variables"
echo "::endgroup::"
