import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';


import {reducer} from '../../store/reducers';
import {Effects} from '../../store/effects';
import {Transferkeys} from '../../store/transferkeys';
import {forFeatureName, StoreService} from './lib-store-b.service';


@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature(forFeatureName, reducer),
    EffectsModule.forFeature([Effects])
  ],
  providers: [StoreService, Transferkeys]
})
export class LibStoreBModule {

  constructor(private storeService: StoreService) {
    // storeService.getAll();
  }
}
