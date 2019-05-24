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
    try {
      spawnSync('command -v yarn >/dev/null');
      return new Yarn(this.dependencies, this.path);
    } catch (e) {}

    return new NPM(this.dependencies, this.path);
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
