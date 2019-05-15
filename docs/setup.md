`sage setup`
============

Sets theme headers and other metadata.

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

_See code: [@sage-cli/plugin-setup](https://github.com/roots/sage-cli/blob/v1.0.0/packages/setup/src/commands/setup/index.ts)_
