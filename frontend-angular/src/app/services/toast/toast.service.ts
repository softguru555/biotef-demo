import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
    setTimeout(() => this.messages.shift(), 3000);
  }
}