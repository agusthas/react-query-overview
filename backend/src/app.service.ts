import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private data: string[] = ['Item 1', 'Item 2', 'Item 3'];

  getHello(): string {
    return 'Hello World!';
  }

  addData(newValue: string) {
    this.data.push(newValue);
    return this.data;
  }

  getData() {
    return this.data;
  }

  clearData() {
    this.data = [];
    return this.data;
  }
}
