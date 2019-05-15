import * as path from 'path';
import { Command } from '@sage-cli/cli-utils';

const root_path = path.dirname(`${__dirname}/../../../../`);

export default class Vanilla extends Command {
  static description = 'Vanilla front-end scaffolding.'

  static aliases = ['preset:vanilla']

  static examples = [
    `$ sage preset:none`,
    `$ sage preset:vanilla`,
  ]

  static flags = {
    ...Command.flags,
  }

  async execute() {
    this.files.delete(path.join(this.files.path, 'resources', 'assets'));
    this.files.copy(path.join(root_path, 'stubs'), path.join(this.files.path, 'resources'));
  }
}
