import { Command } from '@sage-cli/cli-utils';
import { Command as ConfigCommand } from '@oclif/config/lib/command';

export default class Preset extends Command {
  static description = 'Swap the front-end scaffolding for the theme'

  static examples = [
    `$ sage preset:bootstrap`,
  ]

  static flags = {
    ...Command.flags,
  }

  protected preset?:string;

  async configure() {
    const preset = await this.prompt('Which preset would you like to install?', Object.keys(this.presets).map(command => command.substr(7)).join('|'));

    const args = ['--path', this.files.path];
    if (this.flags.suppress) {
      args.push('--suppress');
    }
    if (this.flags.confirm) {
      args.push('--confirm');
    }
    if (! this.interactive) {
      args.push('--no-interactive');
    }
    if (this.flags.force) {
      args.push('--force');
    }

    this.presets[`preset:${preset}`].load().run(args);
  }

  async execute() {

  }

  get presets() {
    const presets: { [key:string]:ConfigCommand.Plugin } = {};
    this.config.plugins
      .map(plugin => plugin.commands
        .filter(command => command.id.substr(0, 7) === 'preset:')
      )
      .filter(commands => commands.length)
      .reduce((commands, command) => commands.concat(command), [])
      .forEach(command => {presets[command.id] = command});

    return presets;
  }
}
