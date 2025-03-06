
print("""
-----------------------------------------------------------------
✨ Hi there! Welcome to k8s-workshop! 👋
-----------------------------------------------------------------
""".strip())

docker_build(
  'ghcr.io/cat-shoulders/ai-jobflow',
  '.',
  {
    'NODE_ENV': 'development'
  },
  './dev.Dockerfile',
  live_update=[
    sync('./src', '/app/src')
  ],
  ignore=[
    './.github','./.idea','./node_modules','./dist'
  ],
  network="host"
)

k8s_yaml(
  [
    'k8s/deployment.yaml',
    'k8s/service.yaml'
  ]
)

k8s_resource('ai-jobflow',
    port_forwards=['9090:8080'],
    # change whether the resource is started by default
    auto_init=False,
    # control whether the resource automatically updates
    trigger_mode=TRIGGER_MODE_AUTO
)


# Run local commands
#   Local commands can be helpful for one-time tasks like installing
#   project prerequisites. They can also manage long-lived processes
#   for non-containerized services or dependencies.
#
#   More info: https://docs.tilt.dev/local_resource.html
#
# local_resource('install-helm',
#                cmd='which helm > /dev/null || brew install helm',
#                # `cmd_bat`, when present, is used instead of `cmd` on Windows.
#                cmd_bat=[
#                    'powershell.exe',
#                    '-Noninteractive',
#                    '-Command',
#                    '& {if (!(Get-Command helm -ErrorAction SilentlyContinue)) {scoop install helm}}'
#                ]
# )


# Extensions are open-source, pre-packaged functions that extend Tilt
#
#   More info: https://github.com/tilt-dev/tilt-extensions
#
load('ext://git_resource', 'git_checkout')


