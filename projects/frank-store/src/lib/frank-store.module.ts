import { NgModule } from '@angular/core';
import {ActionReducerMap, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {FrankEffects} from './frank-effects';

export const reducers: ActionReducerMap<any> = {};

@NgModule({
  imports: [
    StoreModule.forFeature('featureFrank', reducers),
    EffectsModule.forRoot([FrankEffects])
  ]
})
export class FrankStoreModule { }
