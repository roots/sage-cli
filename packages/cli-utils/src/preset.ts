import { Command as ConfigCommand } from '@oclif/config/lib/command';
import { flags } from '@oclif/command';
import Command from './command';

export default abstract class Preset extends Command {

  protected preset?:string;

  protected dependencies?:string[];

  get presets() : { [key:string]:ConfigCommand.Plugin } {
    const presets: { [key:string]:ConfigCommand.Plugin } = {};
    this.config.plugins
      .map(plugin => plugin.commands
        .filter(command => command.id.substr(0, 7) === 'preset:')
      )
      .filter(commands => commands.length)
      .reduce((commands, command) => commands.concat(command), [])
      .forEach(command => {
        presets[command.id] = command;
      });

    return presets;
  }

  static flags = {
    ...Command.flags,
    clean: flags.boolean({ description: 'Uninstall all presets before installing specified preset.' }),
    uninstall: flags.boolean({ description: 'Uninstall specified preset.' })
  }

  async clean() {
    const presets = Object.keys(this.presets)
      .filter(preset => preset !== 'preset:none' && preset !== 'preset:vanilla')
      .map(key => this.presets[key]);

    for (let preset of presets) {
      await this.exec(preset.load(), ['--uninstall']);
    }
  }

  async install() {
    if (! this.dependencies) {
      return;
    }
    try {
      this.files.install(this.dependencies);
    } catch (e) {
      this.error(e);
    }
    this.info(`Installed dependencies ${this.dependencies.join(' ')}`);
  }

  async uninstall() {
    if (! this.dependencies) {
      return;
    }
    try {
      this.files.uninstall(this.dependencies);
    } catch (e) {
      this.error(e);
    }
    this.info(`Removed dependencies ${this.dependencies.join(' ')}`);
  }

  async execute() {
    if (this.flags.clean) {
      await this.clean();
    }
    if (this.flags.uninstall) {
      await this.uninstall();
    }
    if (! this.flags.uninstall) {
      await this.install();
    }
  }

  execBuildArgs():string[] {
    const args = super.execBuildArgs();

    if (this.flags.uninstall && ! this.flags.clean) {
      args.push('--uninstall');
    }

    return args;
  }
}
