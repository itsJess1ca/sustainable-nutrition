import * as marked from 'marked';

export class Marked {
  marked = marked;
  constructor() {
    this.marked.setOptions({
      gfm: true,
      breaks: true
    });
  }

  transform(str: string) {
    return this.marked(str);
  }
}
