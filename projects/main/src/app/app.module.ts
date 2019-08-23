import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

// Lib imports
import * as fromKpnStore from '@kpn-store';
import * as fromFrankStore from '@frank-store';


// Store config
export interface State {}
export const reducers: ActionReducerMap<State> = {};
export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    fromKpnStore.KpnStoreModule,
    fromFrankStore.FrankStoreModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
