import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { createAction, createFeatureSelector, createSelector, props, select, Store } from '@ngrx/store';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { State } from '../../store/reducers';
import { Transferkeys } from '../../store/transferkeys';
import { PlatformService } from '../../../main/src/app/services/platform.service';
import { LocalDataStorage } from '../../../main/src/app/services/localDataStorage';
import { take } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';


export const forFeatureName = 'STORE-A';

export class StoreActions {
  static getAll = createAction(`[${forFeatureName} -getAll]`);
  static success = createAction(`[${forFeatureName} -success]`, props<{ items: any}>());
}

export class StoreSelector {
  static getState = createFeatureSelector<State>(forFeatureName);
  static selectAll = createSelector(StoreSelector.getState, (state: State) => state.keys);
  static hasData  = createSelector(StoreSelector.getState, (state: State) => !!state.keys);
}

@Injectable()
export class StoreService {
  private hasDataInStore: boolean;
  private cookie: any;

  public get fromApi(): Observable<any> {
    const url = 'https://raw.githubusercontent.com/frankanneveld/FakeApi/master/componentA.json';
    log(url); // TODO: Clean up later
    return this.http.get(url).pipe(take(1));
  }

  public get allSubscription(): Observable<any> {
    return this.store.pipe(select(StoreSelector.selectAll));
  }

  constructor(private platformService: PlatformService,
              private transferkeys: Transferkeys,
              private cookieService: CookieService,
              private http: HttpClient,
              private injector: Injector,
              private localDataStorage: LocalDataStorage,
              private store: Store<any>) {
    this.store.pipe(select(StoreSelector.hasData)).subscribe( has => this.hasDataInStore = has);
    // if (platformService.isServer) this.getCookieOnServer();
  }

  public setCached(data: any) {
    this.localDataStorage.setCachedItem( forFeatureName, data).subscribe( res => {
      log('Subscribtion from setCache', res);
      log('version', res.version);
      this.cookieService.set(forFeatureName, JSON.stringify({version: (res.version || null)}));
      this.localDataStorage.getLength().subscribe( l => {
        log('Cache length', l);
      });
    });
  }


  private getCookieOnServer() {
    const req = this.injector.get('request');
    if (!!req && req.cookie) {
      Object.keys(req.cookie).forEach( c => {
        if (c === forFeatureName) {
          this.cookie = JSON.parse(req.cookie[forFeatureName]) || null;
        }
      });
    }
  }

  public getAll(cache = false): void {
    if (this.platformService.isServer) {
      this.getCookieOnServer();
      this.fromApi.subscribe(key => {
        log('version in cookie : ', this.cookie.version);
        log('version form api : ', key.version);
        if (this.cookie.version !== key.version) {
          log('VERSION DIFFERENCE : write data in transferkey');
          this.transferkeys.transferKey = key;
        } else {
          log('remove transferkey');
          this.transferkeys.remove();
        }
      });
    } else if (this.transferkeys.hasTransferKey) {
      const transferkey = this.transferkeys.transferKey;
      this.store.dispatch(StoreActions.success(transferkey));
      if (cache) this.setCached(transferkey);
    } else if (!this.hasDataInStore) {
      this.localDataStorage.getCachedItem(forFeatureName).subscribe( (items: any) => {
        const actions = items ? StoreActions.success(items) : StoreActions.getAll();
        this.store.dispatch(actions);
      });
    }
  }
}

const log = console.log;
