import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(@Inject(PLATFORM_ID) private platformID: string) {
  }

  get isBrowser() {
    return isPlatformBrowser(this.platformID);
  }

  get isServer() {
    return isPlatformServer(this.platformID);
  }
}
