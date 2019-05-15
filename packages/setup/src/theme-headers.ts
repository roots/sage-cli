import slugify from 'slugify';

type Resource = {
  uri:string,
  name: string,
};

type MetaConfig = {
  name?: string,
  version?: string,
  uri?: string,
  description?: string,
  author?: string | Resource,
  author_uri?: string,
  license?: string | Resource,
  license_uri?: string,
  tags?: string | string[],
  text_domain?: string,
  template?: string,
  banner?: string,
};

type HeaderContent = string|null|undefined;
type Header = { header:string, key:string, content:HeaderContent };
type RawHeaders = { [key:string] : Header };

export class ThemeHeaders {
  public name: string;
  public version?: string;
  public uri?: string;
  public description?: string;
  public author: Resource;
  public license: Resource;
  public tags?: string[];
  public text_domain: string;
  public template?: string;
  public banner: string;

  static defaults = {
    name: "Sage Starter Theme",
    version: "10.0.0",
    uri: "https://roots.io/sage/",
    description: "Sage is a WordPress starter theme.",
    author: "Roots <https://roots.io>",
    license: "MIT <http://opensource.org/licenses/MIT>",
    tags: ["sage", "bootstrap"],
    text_domain: "sage",
    banner: "This WordPress theme was built using tools provided by Roots.\n\nhttps://roots.io/"
  }

  constructor(config:MetaConfig) {
    this.name = config.name || ThemeHeaders.defaults.name;
    this.version = config.version || ThemeHeaders.defaults.version;
    this.uri = config.uri || ThemeHeaders.defaults.uri;
    this.description = config.description || ThemeHeaders.defaults.description;
    this.author = ThemeHeaders.getResource(config.author || ThemeHeaders.defaults.author);
    this.license = ThemeHeaders.getResource(config.license || ThemeHeaders.defaults.license);
    this.text_domain = config.text_domain || slugify(this.name);
    this.template = config.template;
    this.banner = config.banner || ThemeHeaders.defaults.banner;

    this.tags = (typeof config.tags === 'string') ? config.tags.split(',') : config.tags;
    if (this.tags) {
      this.tags = this.tags.map(tag => tag.toLowerCase().trim());
    }
  }

  public static getResource(config: string | Resource) : Resource {
    if (typeof config !== 'string') {
      return config;
    }
    const name_uri: Resource = { name: '', uri: ''};

    const splitString = config.split(/[<>]/g).filter(Boolean);

    if (splitString.length === 0) {
      return { name: '', uri: '' };
    }

    if (splitString.length === 1) {
      return {
        name: (splitString.pop() || '').trim(),
        uri: ''
      };
    }

    name_uri.uri = (splitString.pop() || '').trim();
    name_uri.name = splitString.join('').trim();

    return name_uri;
  }

  public all(): RawHeaders {
    return {
      name: {
        header: 'Theme Name',
        key: 'name',
        content: this.name,
      },
      uri: {
        header: 'Theme URI',
        key: 'uri',
        content: this.uri,
      },
      author: {
        header: 'Author',
        key: 'author',
        content: this.author.name,
      },
      author_uri: {
        header: 'Author URI',
        key: 'author_uri',
        content: this.author.uri,
      },
      description: {
        header: 'Description',
        key: 'description',
        content: this.description,
      },
      version: {
        header: 'Version',
        key: 'version',
        content: this.version,
      },
      license: {
        header: 'License',
        key: 'license',
        content: this.license.name,
      },
      license_uri: {
        header: 'License URI',
        key: 'license_uri',
        content: this.license.uri,
      },
      tags: {
        header: 'Tags',
        key: 'tags',
        content: Array.from(this.tags || []).join(', '),
      },
      text_domain: {
        header: 'Text Domain',
        key: 'text_domain',
        content: this.text_domain,
      },
      template: {
        header: 'Template',
        key: 'template',
        content: this.template,
      }
    };
  }

  public header(header: string): HeaderContent {
    const filtered = this.filter((_unused, current:Header) => (current.header === header) || current.key === header);
    return Object.keys(filtered)
      .reduce((_unused:HeaderContent, key:string) => filtered[key].content, null);
  }

  public filter(callable:(content: HeaderContent, header: Header, headers: RawHeaders) => boolean = Boolean) : RawHeaders {
    const all = this.all();
    return Object.keys(all)
      .filter(header => callable(all[header].content, all[header], all))
      .reduce((headers: RawHeaders, header: string) => {
        headers[header] = all[header];
        return headers;
      }, {});
  }

  public toString(): string {
    const headers = this.filter();
    return `
/*
${
Object.keys(headers)
  .map(header => `${headers[header].header}: ${headers[header].content}`)
  .concat(['', this.banner])
  .join("\n").trim()
}
*/
`;
  }
}

export default ThemeHeaders;
