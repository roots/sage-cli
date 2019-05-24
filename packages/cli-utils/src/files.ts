import * as fs from 'fs-extra';
import walk from 'klaw-sync';
import { Volume } from 'memfs';
import * as original_path from 'path';
import { Dependencies } from './dependencies';

export const path = Object.assign({
  contains: (parent:string, child:string) => parent.split(/[\/\\]/g)
    .filter(Boolean).every((segment, i) => child.split(/[\/\\]/g).filter(Boolean)[i] === segment)
}, original_path);

export class Filesystem {
  protected _path:string;
  protected fs = new Volume;
  public delete_queue:string[] = [];

  constructor(path:string = process.cwd()) {
    this._path = path;
  }

  public get file_list():string[] {
    return Object.keys(this.memory.toJSON());
  }

  get path() {
    return this._path;
  }

  set path(_path:string) {
    if (this.memory.existsSync(this._path)) {
      this.memory.renameSync(this._path, _path);
    }
    this._path = _path;
  }

  get memory() {
    return this.fs;
  }

  get persistant() {
    return fs;
  }

  public clear() {
    this.fs = new Volume;
  }

  public absolute(_path:string) {
    return path.isAbsolute(_path) ? _path : path.join(this.path, _path);
  }

  public relative(_path:string) {
    return path.relative(this.path, this.absolute(_path));
  }

  public exists(_path:string) {
    return this.persistant.existsSync(this.absolute(_path));
  }

  public read(file:string, options?: null) {
    return this.persistant.readFileSync(this.absolute(file), options);
  }

  public mkdir(path:string, mode?: undefined) {
    if (! this.memory.existsSync(path)) {
      this.memory.mkdirpSync(path, mode);
    }
  }

  public copy(source:string, target:string = this.path) {

    const _copy = (file:string) => {
      const dest = path.join(target, file);
      this.mkdir(path.dirname(dest));
      this.write(dest, this.persistant.readFileSync(path.join(source, file)));
    };

    if (this.persistant.statSync(source).isFile()) {
      _copy(source);
      return;
    }

    walk(source)
      .filter(file => file.stats.isFile())
      .map(file => path.relative(source, file.path))
      .forEach(_copy);
  }

  public delete(_path:string) {
    const file = path.contains(this.path, this.absolute(_path)) ? this.relative(_path) : path.join(this.path, _path);

    if (! path.contains(this.path, this.absolute(file))) {
      throw new Error(`Cannot write ${file}. Cannot write files outside of ${this.path}.`);
    }

    this.delete_queue.push(this.absolute(file));
  }

  public write(file:string, contents:any, options?:undefined) {
    file = path.contains(this.path, this.absolute(file)) ? this.relative(file) : path.join(this.path, file);

    if (! path.contains(this.path, this.absolute(file))) {
      throw new Error(`Cannot write ${file}. Cannot write files outside of ${this.path}.`);
    }

    this.mkdir(path.dirname(file));
    this.memory.writeFileSync(this.relative(file), contents, options);
  }

  public install(dependencies:string|string[], dev:boolean = false) {
    return new Dependencies(dependencies, this.path).client.install(dev);
  }

  public uninstall(dependencies:string|string[]) {
    return new Dependencies(dependencies, this.path).client.uninstall();
  }
}

export const files = new Filesystem;

export default files;
