import {NgModule} from '@angular/core';
import {ActionReducerMap, StoreModule} from '@ngrx/store';
import {CopyService} from '../copy/copy.service';
import {CopyTransferkeys} from '../copy/copy.transferkeys';
import {HttpClientModule} from '@angular/common/http';

export const reducers: ActionReducerMap<any> = {};

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature('KPN', reducers)
    // import all the store modules here as array
  ],
  providers: [CopyService, CopyTransferkeys],
})
export class KpnStoreModule { }
