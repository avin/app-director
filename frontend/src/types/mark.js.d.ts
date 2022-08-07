declare module 'mark.js' {
  class Mark {
    constructor(context: string | HTMLElement | ReadonlyArray<HTMLElement> | NodeList);

    mark(keyword: string | ReadonlyArray<string>, options?: Mark.MarkOptions): void;

    unmark(options?: Mark.MarkOptions): void;
  }
  export default Mark;
}
