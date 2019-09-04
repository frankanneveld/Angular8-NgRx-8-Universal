import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {HttpClientModule} from '@angular/common/http';
import {CopyTransferkeys} from '../copy/copy.transferkeys';
import {CopyService} from '../copy/copy.service';
import {EffectsModule} from '@ngrx/effects';
import {CopyEffects} from '../copy/copy.effects';
import {reducer} from '../copy/copy.reducers';


// export const reducers: ActionReducerMap<any> = {};

const copyProviders = [CopyService, CopyTransferkeys];
const bundleProviders = [];

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature('kpn', reducer),
    EffectsModule.forFeature([CopyEffects])
  ],
  providers: [...copyProviders, ...bundleProviders], // etc ...
})
export class KpnStoreModule {
  constructor(private copyService: CopyService) {
    copyService.getAllCopy();
  }
}
