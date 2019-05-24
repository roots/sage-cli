import * as path from 'path';
import {Preset} from '@sage-cli/cli-utils';

const root_path = path.resolve(`${__dirname}/../../../`);

export default class Bootstrap extends Preset {
  static description = 'Use Bootstrap front-end scaffolding.'

  static examples = [
    `$ sage preset:bootstrap`,
  ]

  static flags = {
    ...Preset.flags,
  }

  protected dependencies = ['bootstrap', 'popper.js', 'jquery'];

  protected preset = 'bootstrap';

  async install() {
    await super.install();
    this.files.copy(path.join(root_path, 'stubs'), path.join(this.files.path, 'resources'));
  }
}
