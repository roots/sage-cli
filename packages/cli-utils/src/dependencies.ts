import { spawnSync, SpawnSyncReturns } from 'child_process';

interface IDependencyManager {
  install(dev:boolean) : SpawnSyncReturns<string>;
  uninstall() : SpawnSyncReturns<string>;
}

export class Dependencies {
  protected dependencies:string[];
  protected path:string;

  constructor(dependencies:string|string[], path:string = process.cwd()) {
    this.dependencies = [].concat(dependencies as any);
    this.path = path;
  }

  get client() : IDependencyManager {
    if (this.isYarn()) {
      return new Yarn(this.dependencies, this.path);
    }

    return new NPM(this.dependencies, this.path);
  }

  protected isYarn() : boolean {
    try {
      // user could have yarn installed, but not be using it
      // this will return false if the user isn't actually using yarn
      if (! process.env.npm_execpath || process.env.npm_execpath.indexOf('yarn') === -1) {
        return false;
      }
      // test to be sure yarn can be spawned
      spawnSync('command -v yarn >/dev/null');
      return true;
    } catch (e) {}

    return false;
  }
}

export class NPM extends Dependencies implements IDependencyManager {
  install(dev:boolean = false) {
    const args = ['install'].concat(this.dependencies, ['--prefix', this.path, '--production=false', dev ? '--save-dev' : '--save', '-']);

    return spawnSync('npm', args);
  }

  uninstall() {
    const args = ['uninstall'].concat(this.dependencies, ['--prefix', this.path]);
    return spawnSync('npm', args);
  }
}

export class Yarn extends Dependencies implements IDependencyManager {
  install(dev:boolean = false) {
    const args = ['add'].concat(this.dependencies, ['--cwd', this.path, '--production=false']);
    if (dev) {
      args.push('--dev')
    }

    return spawnSync('yarn', args);
  }

  uninstall() {
    const args = ['remove'].concat(this.dependencies, ['--cwd', this.path]);

    return spawnSync('yarn', args);
  }
}
