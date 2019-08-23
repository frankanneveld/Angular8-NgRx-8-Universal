import {NgModule} from '@angular/core';
import {ActionReducerMap, StoreModule} from '@ngrx/store';
import {HttpClientModule} from '@angular/common/http';
import {CopyTransferkeys} from '../copy/copy.transferkeys';
import {CopyService} from '../copy/copy.service';

export const reducers: ActionReducerMap<any> = {};

const copyProviders = [CopyService, CopyTransferkeys];
const bundleProviders = [];

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature('kpn', reducers)
  ],
  providers: [...copyProviders, ...bundleProviders], // etc ...
})
export class KpnStoreModule { }
