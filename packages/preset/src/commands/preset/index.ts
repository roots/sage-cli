import { Preset as Command } from '@sage-cli/cli-utils';

export default class Preset extends Command {
  static description = 'Swap the front-end scaffolding for the theme'

  static examples = [
    `$ sage preset:bootstrap`,
  ]

  static flags = {
    ...Command.flags,
  }

  async configure() {
    this.preset = await this.prompt('Which preset would you like to install?', Object.keys(this.presets).map(command => command.substr(7)).join('|'));
  }

  async validate() {
    if (! this.preset || ! this.presets[`preset:${this.preset}`]) {
      this.error('You must specify a valid preset.');
    }
  }

  async execute() {
    if (this.flags.clean) {
      await this.clean();
    }
    await this.exec(this.presets[`preset:${this.preset}`].load());
  }
}
