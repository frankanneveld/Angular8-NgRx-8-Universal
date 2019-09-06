import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {createAction, createFeatureSelector, createSelector, props, select, Store} from '@ngrx/store';
import {isPlatformServer} from '@angular/common';
import {Transferkeys} from '../store/frank.transferkeys';
import {State} from '../store/frank.reducers';

export const forFeatureName = 'featureFrank';

export class StoreActions {
  static getAll = createAction('[Frank Get All]');
  static success = createAction('[Frank Success]', props<{ items: any }>());
}

export class StoreSelector {
  static getState = createFeatureSelector<State>(forFeatureName);
  static selectAll = createSelector(StoreSelector.getState, (state: State) => state.keys);
}


@Injectable()
export class FrankStoreService {

  public get fromApi(): Observable<any> {
    return this.http.get('https://raw.githubusercontent.com/frankanneveld/FakeApi/master/db.json');
  }

  constructor(@Inject(PLATFORM_ID) private platformId: string,
              private transferkeys: Transferkeys,
              private http: HttpClient,
              private store: Store<any>) {
  }

  public get allFrankSubscription(): Observable<any> {
    return  this.store.pipe(select(StoreSelector.selectAll));
  }


  public getAll() {
    if (isPlatformServer(this.platformId)) {
      this.fromApi.subscribe(key => this.transferkeys.transferKey = key);
    } else if (this.transferkeys.hasTransferKey) {
      this.store.dispatch(StoreActions.success(this.transferkeys.transferKey));
    } else {
      this.store.dispatch(StoreActions.getAll());
    }
  }
}

