// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class LocalStorageService {
//   constructor() {}

//   getItem(key: string): string | null {
//     return localStorage.getItem(key);
//   }

//   setItem(key: string, value: string) {
//     localStorage.setItem(key, value);
//   }

//   removeItem(key: string): void {
//     localStorage.removeItem(key);
//   }
// }

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  getItem(key: string): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(key);
    }
    return null;
  }

  setItem(key: string, value: string): void {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
    }
  }

  removeItem(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }
}
