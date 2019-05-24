import * as path from 'path';
import { Command as BaseCommand, flags } from '@oclif/command';
import { cli, IPromptOptions } from 'cli-ux';
import { Input, args } from '@oclif/parser';
import cosmiconfig from 'cosmiconfig';
import * as fs from 'fs-extra';
import chalk from 'chalk';
import {Filesystem, files} from './files';

const SAGE_PATH_TEST = ['config', 'resources', 'style.css', 'composer.json', 'package.json'];

export abstract class Command extends BaseCommand {
  static flags = {
    'no-interaction': flags.boolean({ description: 'Do not ask any interactive questions', allowNo: false, default: false }),
    suppress: flags.boolean({ char: 'Y', description: 'Suppress warnings when overwriting or deleting files', default: false }),
    path: flags.string({ description: 'Custom path to Sage theme' }),
    force: flags.boolean({ description: 'Disregard all failsafes.' })
  }

  static parent:BaseCommand;

  static args:args.IArg[] = [];

  protected complete?:string = `all done!`

  protected files = files;

  public flags: {[key: string]: any} = {};
  public args: {[key: string]: any} = {};

  protected interactive?: boolean;
  protected suppress?: boolean;
  protected telemetry?:{ [key:string]: any };
  protected sage?:cosmiconfig.CosmiconfigResult;

  async init() {
    const { args, flags } = this.parse(<Input<any>>this.constructor);

    if (! Command.parent) {
      Command.parent = this;
    }

    this.args = args;
    this.flags = flags;

    this.files.path = flags.path || process.cwd();
    this.interactive = ! flags['no-interaction'];
    this.suppress = flags.suppress;

    this.sage = await cosmiconfig('sage').search(this.files.path);

    await this.initialize();

    if (! this.flags.force) {
      await this.failsafe();
    }
  }

  async run() {
    await this.config.runHook('configure', {
      id: this.constructor.name.toLowerCase(),
      command: this
    });
    await this.configure();

    await this.config.runHook('validate', {
      id: this.constructor.name.toLowerCase(),
      command: this
    });
    await this.validate();

    await this.config.runHook('execute', {
      id: this.constructor.name.toLowerCase(),
      command: this
    });
    await this.execute();

    if (Command.parent !== this) {
      return;
    }

    await this.config.runHook('filesystem', {
      id: this.constructor.name.toLowerCase(),
      write: this.files.memory.toJSON(),
      delete: this.files.delete_queue,
    });
    await this.deleteFiles();
    await this.writeFiles();

    this.files.clear();

    if (this.telemetry) {
      await this.config.runHook('telemetry', {
        id: this.constructor.name.toLowerCase(),
        ...this.telemetry,
      });
    }

    if (this.complete) {
      await this.success(this.complete);
    }
  }

  async initialize():Promise<void> {
    // ...
  }

  async failsafe():Promise<void> {
    if (! this.sage && SAGE_PATH_TEST.filter(file => fs.existsSync(path.join(this.files.path, file))).length !== SAGE_PATH_TEST.length) {
      this.error(`${this.files.path} does not appear to be a valid Sage directory.`, { code: 'InvalidSageDirectory', exit: false });
      this.log('     Try passing `--path=<path/to/sage>` or `--force` to ignore this error and treat this path a Sage directory.');
      process.exit(1000);
    }
  }

  async configure():Promise<void> {
    // ...
  }

  async validate():Promise<void> {
    // ...
  }

  async execute():Promise<void> {
    this.info('This command does nothing.');
  }

  async deleteFiles() : Promise<void> {
    const delete_queue = this.files.delete_queue.filter(fs.existsSync);
    const confirm = ! delete_queue.length || this.suppress || await this.confirm(
      chalk`{yellow.keyword('orange') warning:} This will delete the following files/folders:\n- ${
        this.files.delete_queue
          .map(this.files.relative.bind(this.files))
          .join("\n- ")
      }\nIs that okay? {yellow [y/n]}`
    );

    if (! confirm) {
      this.info('No files were removed.');
      return;
    }

    this.files.delete_queue.map(fs.removeSync);
  }

  async writeFiles():Promise<void> {
    const all_files = this.files.file_list;
    const overwrite_list = all_files
      .map(this.files.absolute.bind(this.files))
      .filter(this.files.exists.bind(this.files));

    const overwrite = !overwrite_list.length || this.suppress || await this.confirm(
      chalk`{yellow.keyword('orange') warning:} This will overwrite the following files:\n- ${
        overwrite_list
          .map(this.files.relative.bind(this.files))
          .join("\n- ")
      }\nIs that okay? {yellow [y/n]}`
    );

    if (! overwrite) {
      this.info('No files were written.');
      return;
    }

    all_files.forEach(source => {
      const dest = path.join(this.files.path, this.files.relative(source));
      const dir = path.dirname(dest);

      if (! fs.existsSync(dir)) {
        fs.mkdirpSync(dir);
      }

      this.files.memory.createReadStream(source)
        .pipe(this.files.persistant.createWriteStream(dest));
    });
  }

  info(message:string) {
    this.log(chalk`{cyan info:} ${message}`);
  }

  warn(message:string|Error) {
    super.warn(chalk`{yellow.keyword('orange') warning:} ${message.toString()}`);
  }

  warning(message:string) {
    this.warn(message);
  }

  success(message:string) {
    this.log(chalk`{green success:} ${message}`);
  }

  async prompt(msg: string, def?: string | IPromptOptions, validate: (response: any) => boolean = (_unused: string) => true) : Promise<any> {
    const options = <IPromptOptions>(typeof def === 'string' ? { default: def } : def);

    if (! this.interactive) {
      return options.default;
    }

    const response = await cli.prompt(msg, options);
    try {
      if (validate(response)) {
        return response;
      }
    } catch {}

    return await this.prompt(msg, def, validate);
  }

  async confirm(message:string, def:boolean = false) : Promise<boolean> {
    if (! this.interactive) {
      return def;
    }

    return await cli.confirm(message);
  }

  async exec(command:{ run(args:string[]):PromiseLike<any> }, argv?:string[]) {
    return await command.run(this.execBuildArgs().concat(argv as any).filter(Boolean));
  }

  execBuildArgs():string[] {
    const args = ['--path', this.files.path];
    if (this.flags.suppress) {
      args.push('--suppress');
    }
    if (this.flags.confirm) {
      args.push('--confirm');
    }
    if (! this.interactive) {
      args.push('--no-interaction');
    }
    if (this.flags.force) {
      args.push('--force');
    }

    return args;
  }
}

export default Command;

