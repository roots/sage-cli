`sage preset`
=============

Swap the front-end scaffolding for the theme

* [`sage preset`](#sage-preset)
* [`sage preset:bootstrap`](#sage-presetbootstrap)
* [`sage preset:none`](#sage-presetnone)

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

_See code: [@sage-cli/plugin-preset](https://github.com/roots/sage-cli/blob/v1.0.0-alpha.1/packages/preset/src/commands/preset/index.ts)_

## `sage preset:bootstrap`

Use Bootstrap front-end scaffolding.

```
USAGE
  $ sage preset:bootstrap

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

_See code: [@sage-cli/plugin-preset-bootstrap](https://github.com/roots/sage-cli/blob/v1.0.0-alpha.1/packages/preset-bootstrap/src/commands/preset/bootstrap.ts)_

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

_See code: [@sage-cli/plugin-preset-none](https://github.com/roots/sage-cli/blob/v1.0.0-alpha.1/packages/preset-none/src/commands/preset/none.ts)_
