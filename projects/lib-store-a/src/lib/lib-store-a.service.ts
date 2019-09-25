import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { createAction, createFeatureSelector, createSelector, props, select, Store } from '@ngrx/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { State } from '../../store/reducers';
import { Transferkeys } from '../../store/transferkeys';
import { PlatformService } from '../../../main/src/app/services/platform.service';
import { LocalDataStorage } from '../../../main/src/app/services/localDataStorage';
import { map, take, tap } from 'rxjs/operators';
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

export interface StoreServiceInterface {
  getAll(cache: boolean): void;
  getOne(id: number): void;
}

@Injectable()
export class StoreService implements StoreServiceInterface {
  private hasDataInStore: boolean;
  private cookie: any;

  public get fromApi(): Observable<any> {
    const url = 'http://localhost:3000/component-a';
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('If-Match', !!this.cookie ? this.cookie.etag : '*');
    log(url); // TODO: Clean up later
    return this.http.get(url, {headers, observe: 'response'}).pipe(
      map(res => ({body: res.body, etag: res.headers.get('ETag')})),
      take(1)
    );
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
    if (platformService.isServer) this.getCookieOnServer();
    if (platformService.isBrowser) this.store.pipe(select(StoreSelector.hasData)).subscribe( has => this.hasDataInStore = has);
  }

  public setCached(data: any) {
    this.localDataStorage.setCachedItem( forFeatureName, data).subscribe( res => {
      // log('Subscribtion from setCache', res);
      this.cookieService.set(forFeatureName, JSON.stringify({version: (res.body.version || null), etag: res.etag}));
      log(forFeatureName + '| version', JSON.parse(this.cookieService.get(forFeatureName)).version);
      log(forFeatureName + '| ETag', JSON.parse(this.cookieService.get(forFeatureName)).etag);
      // this.localDataStorage.getLength().subscribe( l => log('Cache length', l));
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

  private handleOnServer() {
    this.fromApi.subscribe(key => {
      if (!!this.cookie && !!key) {
        console.log(this.cookie.etag , ' : ', key.etag);
        console.log(this.cookie.version , ' : ', key.body.version);
        if (this.cookie.etag !== key.etag) {
          this.transferkeys.transferKey = key;
          log('\x1b[36m%s\x1b[0m', forFeatureName + ':: ETAG DIFFERENCE : API response send to transferkey', '\x1b[0m');
        } else {
          this.transferkeys.remove();
          log('\x1b[1m', forFeatureName + ':: EQUAL ETAGS : no need to transfer data', '\x1b[0m');
        }
      } else if (!!key) {
        this.transferkeys.transferKey = key;
        log('\x1b[31m', forFeatureName + ':: DEFAULT : API response send to transferkey', '\x1b[0m');
      }
    });
  }

  public getAll(cache = false): void {
    if (this.platformService.isServer) {
      this.handleOnServer();
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

  public getOne(id: number): void {
    if (this.platformService.isBrowser) {

    }
  }
}

const log = console.log;

