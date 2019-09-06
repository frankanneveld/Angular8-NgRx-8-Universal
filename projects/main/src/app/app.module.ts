import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {MetaReducer, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';


// Library Imports
import * as fromFrankStore from '@frank-store';
import * as fromKpnStore from '@kpn-store';


// export const reducers: ActionReducerMap<{[key: string]: any}> = {};
export const metaReducers: MetaReducer<{[key: string]: any}>[] = !environment.production ? [] : [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    StoreModule.forRoot({}, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([]),
    AppRoutingModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    fromFrankStore.FrankStoreModule,
    fromKpnStore.KpnStoreModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
