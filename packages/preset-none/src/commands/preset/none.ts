import * as path from 'path';
import {Preset} from '@sage-cli/cli-utils';

const root_path = path.dirname(`${__dirname}/../../../../`);

export default class Vanilla extends Preset {
  static description = 'Vanilla front-end scaffolding.'

  static aliases = ['preset:vanilla']

  static examples = [
    `$ sage preset:none`,
    `$ sage preset:vanilla`,
  ]

  static flags = {
    ...Preset.flags,
  }

  protected preset = 'none';

  async execute() {
    await this.clean();
    this.files.delete(path.join(this.files.path, 'resources', 'assets'));
    this.files.copy(path.join(root_path, 'stubs'), path.join(this.files.path, 'resources'));
  }
}
