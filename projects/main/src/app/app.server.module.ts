import {Inject, NgModule, PLATFORM_ID} from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';

import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';
import {CopyService} from '@kpn-store';
import {isPlatformServer} from '@angular/common';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {
  constructor(@Inject(PLATFORM_ID) private platformId: string, private copyService: CopyService) {
    const copy$ = copyService.getAll(isPlatformServer(platformId));
    copy$.subscribe(console.log);
  }
}
