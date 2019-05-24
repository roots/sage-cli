Preset plugin for [`sage`](https://roots.io/sage/cli)
================

Swap the front-end scaffolding for the theme.

[![Version](https://img.shields.io/npm/v/@sage-cli/plugin-preset.svg)](https://npmjs.org/package/@sage-cli/plugin-preset)
[![Known Vulnerabilities](https://snyk.io/test/npm/@sage-cli/plugin-preset/badge.svg)](https://snyk.io/test/npm/@sage-cli/plugin-preset)
[![Downloads/week](https://img.shields.io/npm/dw/@sage-cli/plugin-preset.svg)](https://npmjs.org/package/@sage-cli/plugin-preset)
[![License](https://img.shields.io/npm/l/@sage-cli/plugin-preset.svg)](https://github.com/roots/sage-cli/blob/master/packages/preset/package.json)


<!-- toc -->

<!-- tocstop -->

<!-- usage -->
```sh-session
$ npm install -g @sage-cli/plugin-preset
$ sage COMMAND
running command...
$ sage (-v|--version|version)
@sage-cli/plugin-preset/1.0.0 linux-x64 node-v10.15.3
$ sage --help [COMMAND]
USAGE
  $ sage COMMAND
...
```
<!-- usagestop -->

<!-- commands -->
* [`sage preset`](#sage-preset)

## `sage preset`

Swap the front-end scaffolding for the theme

```
USAGE
  $ sage preset

OPTIONS
  -Y, --suppress    Suppress warnings when overwriting or deleting files
  --clean           Uninstall all presets before installing specified preset.
  --force           Disregard all failsafes.
  --no-interaction  Do not ask any interactive questions
  --path=path       Custom path to Sage theme
  --uninstall       Uninstall specified preset.

EXAMPLE
  $ sage preset:bootstrap
```

_See code: [src/commands/preset/index.ts](https://github.com/roots/sage-cli/blob/v1.0.0/packages/preset/src/commands/preset/index.ts)_
<!-- commandsstop -->
