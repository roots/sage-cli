Preset plugin for [`sage`](https://roots.io/sage/cli)
================

Swap the front-end scaffolding for the theme.

[![Version](https://img.shields.io/npm/v/@sage-cli/plugin-preset.svg)](https://npmjs.org/package/@sage-cli/plugin-preset)
[![Known Vulnerabilities](https://snyk.io/test/npm/@sage-cli/plugin-preset/badge.svg)](https://snyk.io/test/npm/@sage-cli/plugin-preset)
[![Downloads/week](https://img.shields.io/npm/dw/@heroku-cli/plugin-status.svg)](https://npmjs.org/package/@sage-cli/plugin-preset)
[![License](https://img.shields.io/npm/l/@sage-cli/plugin-preset.svg)](https://github.com/roots/sage-cli/blob/master/packages/preset/package.json)


<!-- toc -->

<!-- tocstop -->

<!-- usage -->
```sh-session
$ npm install -g @sage-cli/plugin-setup
$ sage COMMAND
running command...
$ sage (-v|--version|version)
@sage-cli/plugin-setup/1.0.0 linux-x64 node-v10.15.3
$ sage --help [COMMAND]
USAGE
  $ sage COMMAND
...
```
<!-- usagestop -->

<!-- commands -->
* [`sage setup`](#sage-setup)

## `sage setup`

Sets theme headers and other metadata.

```
USAGE
  $ sage setup

OPTIONS
  -Y, --suppress                 Suppress warnings when overwriting or deleting files
  -a, --author=author            Author
  -d, --description=description  Description
  -i, --text_domain=text_domain  Text Domain
  -l, --license=license          Theme license
  -n, --name=name                Theme Name
  -p, --template=template        Template (parent theme)
  -t, --tags=tags                Tags (comma separated)
  -u, --uri=uri                  Theme URI
  -v, --version=version          Theme Version
  --author_uri=author_uri        Author URI
  --banner=banner                Banner (appears after the headers)
  --force                        Disregard all failsafes.
  --license_uri=license_uri      License URI
  --no-interaction               Do not ask any interactive questions
  --path=path                    Custom path to Sage theme

EXAMPLE
  $ sage setup --name=Sage --version=10.0.0 --uri=https://roots.io/ --description='Sage is a WordPress starter theme' 
  --author='Roots <https://roots.io/>' --license='MIT <http://opensource.org/licenses/MIT>' 
  --tags=wordpress,sage,bootstrap
```

_See code: [src/commands/setup/index.ts](https://github.com/roots/sage-cli/blob/v1.0.0/packages/setup/src/commands/setup/index.ts)_
<!-- commandsstop -->
