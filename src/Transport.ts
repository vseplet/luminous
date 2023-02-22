export class Transport {
  constructor() {}

  addLogString(_logString: string): void {
  }

  async sendAsync(_data: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return true;
  }

  sendSync(_data: string): boolean {
    return true;
  }
}
