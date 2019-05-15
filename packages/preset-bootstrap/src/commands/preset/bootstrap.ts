import * as path from 'path';
import { Command } from '@sage-cli/cli-utils';

const root_path = path.resolve(`${__dirname}/../../../`);

export default class Bootstrap extends Command {
  static description = 'Use Bootstrap front-end scaffolding.'

  static examples = [
    `$ sage preset:bootstrap`,
  ]

  static flags = {
    ...Command.flags,
  }

  async execute() {
    this.files.copy(path.join(root_path, 'stubs'), path.join(this.files.path, 'resources'));
  }
}
