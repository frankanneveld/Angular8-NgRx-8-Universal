import {NgModule} from '@angular/core';
import {ActionReducerMap, StoreModule} from '@ngrx/store';
import {CopyService} from '../copy/copy.service';
import {CopyTransferkeys} from '../copy/copy.transferkeys';
import {HttpClientModule} from '@angular/common/http';

export const reducers: ActionReducerMap<any> = {};

const copyProviders = [CopyService, CopyTransferkeys];
const bundleProviders = [];

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature('KPN', reducers)
  ],
  providers: [...copyProviders, ...bundleProviders], // etc ...
})
export class KpnStoreModule { }
