import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createAction, createFeatureSelector, createSelector, props, select, Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';

import { State } from '../../store/reducers';
import { Transferkeys } from '../../store/transferkeys';
import { PlatformService } from '../../../main/src/app/services/platform.service';


export const forFeatureName = 'STORE-A';
export const log = console.log;

export class StoreActions {
  static getAll = createAction('[STORE A Get All]');
  static success = createAction('[STORE A Success]', props<{ items: any }>());
}

export class StoreSelector {
  static getState = createFeatureSelector<State>(forFeatureName);
  static selectAll = createSelector(StoreSelector.getState, (state: State) => state.keys);
  static hasData  = createSelector(StoreSelector.getState, (state: State) => !!state.keys);
}

@Injectable()
export class StoreService {
  private hasDataInStore: boolean;

  public get fromApi(): Observable<any> {
    log('calling api: https://raw.githubusercontent.com/frankanneveld/FakeApi/master/componentA.json');
    return this.http.get('https://raw.githubusercontent.com/frankanneveld/FakeApi/master/componentA.json');
  }

  public get allSubscription(): Observable<any> {
    return this.store.pipe(select(StoreSelector.selectAll));
  }

  constructor(private platformService: PlatformService,
              private transferkeys: Transferkeys,
              private http: HttpClient,
              private store: Store<any>) {
    this.store.pipe(select(StoreSelector.hasData)).subscribe( has => this.hasDataInStore = has);
  }

  public getAll(): void {
    if (this.platformService.isServer) {
      this.fromApi.subscribe(key => this.transferkeys.transferKey = key);
    } else if (this.transferkeys.hasTransferKey) {
      this.store.dispatch(StoreActions.success(this.transferkeys.transferKey));
    } else if (!this.hasDataInStore) {
      this.store.dispatch(StoreActions.getAll());
    }
  }
}
