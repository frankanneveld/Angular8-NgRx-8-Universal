import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Observable} from 'rxjs';
import {createAction, createFeatureSelector, createSelector, props, select, Store} from '@ngrx/store';
import {HttpClient} from '@angular/common/http';
import {isPlatformServer} from '@angular/common';

import {State} from '../../store/reducers';
import {Transferkeys} from '../../store/transferkeys';



export const forFeatureName = 'STORE-C';
export const log = console.log;

export class StoreActions {
  static getAll   = createAction('[STORE C Get All]');
  static success  = createAction('[STORE C Success]', props<{ items: any }>());
}

export class StoreSelector {
  static getState   = createFeatureSelector<State>(forFeatureName);
  static selectAll  = createSelector(StoreSelector.getState, (state: State) => state.data);
}

@Injectable()
export class StoreService {

  public get fromApi(): Observable<any> {
    log('calling api: https://raw.githubusercontent.com/frankanneveld/FakeApi/master/componentC.json');
    return this.http.get('https://raw.githubusercontent.com/frankanneveld/FakeApi/master/componentC.json');
  }

  public get allSubscription(): Observable<any> {
    return  this.store.pipe(select(StoreSelector.selectAll));
  }

  constructor(@Inject(PLATFORM_ID) private platformId: string,
              private transferkeys: Transferkeys,
              private http: HttpClient,
              private store: Store<any>) {
  }

  public getAll(): void {
    if (isPlatformServer(this.platformId)) {
      this.fromApi.subscribe(key => this.transferkeys.transferKey = key);
    } else if (this.transferkeys.hasTransferKey) {
      this.store.dispatch(StoreActions.success(this.transferkeys.transferKey));
    } else {
      this.store.dispatch(StoreActions.getAll());
    }
  }
}
