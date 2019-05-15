import { flags } from '@oclif/command';
import { Command } from '@sage-cli/cli-utils';
import { ThemeHeaders } from '../../theme-headers';

export default class Setup extends Command {
  static description = 'Sets theme headers and other metadata.'

  static examples = [
    `$ sage setup --name=Sage --version=10.0.0 --uri=https://roots.io/ --description='Sage is a WordPress starter theme' --author='Roots <https://roots.io/>' --license='MIT <http://opensource.org/licenses/MIT>' --tags=wordpress,sage,bootstrap`,
  ]

  static args = [
    ...Command.args,
  ]

  static flags = {
    ...Command.flags,
    // interactive flags
    name: flags.string({ char: 'n', description: 'Theme Name' }),
    version: flags.string({ char: 'v', description: 'Theme Version' }),
    uri: flags.string({ char: 'u', description: 'Theme URI' }),
    description: flags.string({ char: 'd', description: 'Description' }),
    author: flags.string({ char: 'a', description: 'Author' }),
    license: flags.string({ char: 'l', description: 'Theme license' }),
    text_domain: flags.string({ char: 'i', description: 'Text Domain' }),
    tags: flags.string({ char: 't', description: 'Tags (comma separated)' }),
    // advanced flags
    template: flags.string({ char: 'p', description: 'Template (parent theme)' }),
    author_uri: flags.string({ description: 'Author URI' }),
    license_uri: flags.string({ description: 'License URI' }),
    banner: flags.string({ description: 'Banner (appears after the headers)' }),
  }

  protected should_write_meta:boolean = false;
  protected headers:ThemeHeaders = new ThemeHeaders(ThemeHeaders.defaults);
  protected stylesheet_path:string = `${process.cwd()}/resources/style.css`;

  async configure() {
    const meta = this.sage ? this.sage.config.theme : null;
    const defaults = new ThemeHeaders(meta || ThemeHeaders.defaults);

    const name = this.flags.name || await this.prompt(<string>Setup.flags.name.description, defaults.name);
    const version = this.flags.version || await this.prompt(<string>Setup.flags.version.description, defaults.version);
    const uri = this.flags.uri || await this.prompt(<string>Setup.flags.uri.description, defaults.uri);
    const description = this.flags.description || await this.prompt(<string>Setup.flags.description.description, defaults.description);
    const author = this.flags.author || await this.prompt(<string>Setup.flags.author.description, `${ThemeHeaders.getResource(defaults.author).name} <${ThemeHeaders.getResource(defaults.author).uri}>` || '');
    const author_uri = this.flags.author_uri || ThemeHeaders.getResource(author).uri || await this.prompt(<string>Setup.flags.author_uri.description, defaults.header('author_uri') || '');
    const license = this.flags.license || await this.prompt(<string>Setup.flags.license.description, `${ThemeHeaders.getResource(defaults.license).name} <${ThemeHeaders.getResource(defaults.license).uri}>` || '');
    const license_uri = this.flags.license_uri || ThemeHeaders.getResource(license).uri || await this.prompt(<string>Setup.flags.license_uri.description, defaults.header('license_uri') || '');
    const text_domain = this.flags.text_domain || await this.prompt(<string>Setup.flags.text_domain.description, defaults.text_domain);
    const tags = this.flags.tags || await this.prompt(<string>Setup.flags.tags.description, Array.from(defaults.tags || []).join(', '));
    const template = this.flags.template;
    const banner = this.flags.banner || defaults.banner;

    this.headers = new ThemeHeaders({
      name, version, uri, description, author, author_uri, license, license_uri, text_domain, template, tags, banner
    });

    this.should_write_meta = !! meta;
    this.stylesheet_path = this.files.exists(`${this.files.path}/style.css`) ? `${this.files.path}/style.css` : `${this.files.path}/resources/style.css`;
    this.suppress = this.suppress || ! this.files.exists(this.stylesheet_path);
    this.file_list.push(this.stylesheet_path);
  }

  async execute() {
    if (! this.should_write_meta) {
      this.files.write(`${this.files.path}/.sagerc`, JSON.stringify(Object.assign(this.sage || {}, { theme: this.headers }), null, 2));
    }

    this.files.write(this.stylesheet_path, this.headers);
  }
}
