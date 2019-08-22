import { NgModule } from '@angular/core';
import {ActionReducerMap, StoreModule} from '@ngrx/store';

export const reducers: ActionReducerMap<any> = {};

@NgModule({
  imports: [
    StoreModule.forFeature('KPN', reducers)
  ],
  exports: []
})
export class KpnStoreModule { }
