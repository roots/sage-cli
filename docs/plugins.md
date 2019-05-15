`sage plugins`
==============

list installed plugins

* [`sage plugins`](#sage-plugins)
* [`sage plugins:install PLUGIN...`](#sage-pluginsinstall-plugin)
* [`sage plugins:link PLUGIN`](#sage-pluginslink-plugin)
* [`sage plugins:uninstall PLUGIN...`](#sage-pluginsuninstall-plugin)
* [`sage plugins:update`](#sage-pluginsupdate)

## `sage plugins`

list installed plugins

```
USAGE
  $ sage plugins

OPTIONS
  --core  show core plugins

EXAMPLE
  $ sage plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.8/src/commands/plugins/index.ts)_

## `sage plugins:install PLUGIN...`

installs a plugin into the CLI

```
USAGE
  $ sage plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  plugin to install

OPTIONS
  -f, --force    yarn install with force flag
  -h, --help     show CLI help
  -v, --verbose

DESCRIPTION
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command 
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in 
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ sage plugins:add

EXAMPLES
  $ sage plugins:install myplugin 
  $ sage plugins:install https://github.com/someuser/someplugin
  $ sage plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.8/src/commands/plugins/install.ts)_

## `sage plugins:link PLUGIN`

links a plugin into the CLI for development

```
USAGE
  $ sage plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

DESCRIPTION
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello' 
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLE
  $ sage plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.8/src/commands/plugins/link.ts)_

## `sage plugins:uninstall PLUGIN...`

removes a plugin from the CLI

```
USAGE
  $ sage plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

ALIASES
  $ sage plugins:unlink
  $ sage plugins:remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.8/src/commands/plugins/uninstall.ts)_

## `sage plugins:update`

update installed plugins

```
USAGE
  $ sage plugins:update

OPTIONS
  -h, --help     show CLI help
  -v, --verbose
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.8/src/commands/plugins/update.ts)_
