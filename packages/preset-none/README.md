Preset plugin for [`sage`](https://roots.io/sage/cli)
================

Swap the front-end scaffolding for the theme.

[![Version](https://img.shields.io/npm/v/@sage-cli/plugin-preset-none.svg)](https://npmjs.org/package/@sage-cli/plugin-preset-none)
[![Known Vulnerabilities](https://snyk.io/test/npm/@sage-cli/plugin-preset-none/badge.svg)](https://snyk.io/test/npm/@sage-cli/plugin-preset-none)
[![Downloads/week](https://img.shields.io/npm/dw/@sage-cli/plugin-preset-none.svg)](https://npmjs.org/package/@sage-cli/plugin-preset-none)
[![License](https://img.shields.io/npm/l/@sage-cli/plugin-preset-none.svg)](https://github.com/roots/sage-cli/blob/master/packages/preset-none/package.json)


<!-- toc -->

<!-- tocstop -->

<!-- usage -->
```sh-session
$ npm install -g @sage-cli/plugin-preset-none
$ sage COMMAND
running command...
$ sage (-v|--version|version)
@sage-cli/plugin-preset-none/1.0.0 linux-x64 node-v10.15.3
$ sage --help [COMMAND]
USAGE
  $ sage COMMAND
...
```
<!-- usagestop -->

<!-- commands -->
* [`sage preset:none`](#sage-presetnone)

## `sage preset:none`

Vanilla front-end scaffolding.

```
USAGE
  $ sage preset:none

OPTIONS
  -Y, --suppress    Suppress warnings when overwriting or deleting files
  --clean           Uninstall all presets before installing specified preset.
  --force           Disregard all failsafes.
  --no-interaction  Do not ask any interactive questions
  --path=path       Custom path to Sage theme
  --uninstall       Uninstall specified preset.

ALIASES
  $ sage preset:vanilla

EXAMPLES
  $ sage preset:none
  $ sage preset:vanilla
```

_See code: [src/commands/preset/none.ts](https://github.com/roots/sage-cli/blob/v1.0.0/packages/preset-none/src/commands/preset/none.ts)_
<!-- commandsstop -->
