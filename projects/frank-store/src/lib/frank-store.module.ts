import { NgModule } from '@angular/core';
import { FrankStoreComponent } from './frank-store.component';
import {ActionReducerMap, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {FrankEffects} from './frank-effects';

export const reducers: ActionReducerMap<any> = {};

@NgModule({
  declarations: [FrankStoreComponent],
  imports: [
    StoreModule.forFeature('featureFrank', reducers),
    EffectsModule.forRoot([FrankEffects])
  ],
  exports: [FrankStoreComponent]
})
export class FrankStoreModule { }
