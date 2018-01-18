import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  message: string = null;

  constructor() { }

  setMessage(message: string): void {
    this.message = message;
  }

  clearMessage(): void {
    this.message = null;
  }

}
