import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app.routing.module';


// Component Imports
import { AppComponent } from './app.component';
import { ComponentAComponent } from './components/component-a/component-a.component';
import { ComponentCComponent } from './components/component-c/component-c.component';
import { ComponentBComponent } from './components/component-b/component-b.component';
// Library Imports
import * as fromLibStoreAModule from '@lib-store-a';
import * as fromLibStoreBModule from '@lib-store-b';
import * as fromLibStoreCModule from '@lib-store-c';
import { LocalDataStorageProvider } from './services/localDataStorage';


// export const reducers: ActionReducerMap<{[key: string]: any}> = {};
export const metaReducers: MetaReducer<{ [key: string]: any }>[] = !environment.production ? [] : [];

@NgModule({
  declarations: [
    AppComponent,
    ComponentAComponent,
    ComponentBComponent,
    ComponentCComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    BrowserTransferStateModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    fromLibStoreAModule.LibStoreAModule,
    fromLibStoreBModule.LibStoreBModule,
    fromLibStoreCModule.LibStoreCModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
