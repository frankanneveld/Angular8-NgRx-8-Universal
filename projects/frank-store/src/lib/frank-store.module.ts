import { NgModule } from '@angular/core';
import { FrankStoreComponent } from './frank-store.component';
import {ActionReducerMap, StoreModule} from '@ngrx/store';

export const reducers: ActionReducerMap<any> = {};

@NgModule({
  declarations: [FrankStoreComponent],
  imports: [
    StoreModule.forFeature('featureFrank', reducers)
  ],
  exports: [FrankStoreComponent]
})
export class FrankStoreModule { }
