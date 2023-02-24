export class Transport<O> {
  options: O;

  constructor(options: O) {
    this.options = options;
  }

  addLogString(_logString: string): void {
  }
}
