import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {FrankEffects} from '../store/frank.effects';
import {reducer} from '../store/frank.reducers';
import {FrankStoreService, forFeatureName} from './frank-store.service';
import {Transferkeys} from '../store/frank.transferkeys';
import {HttpClientModule} from '@angular/common/http';


// export const reducers: ActionReducerMap<any> = {};

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature(forFeatureName, reducer),
    EffectsModule.forFeature([FrankEffects])
  ],
  providers: [FrankStoreService, Transferkeys]
})
export class FrankStoreModule {

  constructor(private frankStoreService: FrankStoreService) {
    frankStoreService.getAll();
  }
}
