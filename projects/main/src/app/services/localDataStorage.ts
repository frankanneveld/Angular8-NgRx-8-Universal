/*
** LocalForage implementation
** install: npm install localforage@^1.5.0 ngforage@^5.0.0
** usage: via setCachedItem and sgetCachedItem etc.
** This service will boot before Angular is up and running
** but has to be in the main module in providers Franky says
*/
import { APP_INITIALIZER, Injectable } from '@angular/core';
import { CachedItem, Driver, NgForage, NgForageCache, NgForageOptions } from 'ngforage';
import { PlatformService } from './platform.service';
import { catchError, map } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';
import * as uuid from 'uuid';

const rootConfig: NgForageOptions = {
  name: 'LOCALSTORE',
  cacheTime: 30000,
  driver: [
    Driver.INDEXED_DB,
    Driver.WEB_SQL,
    Driver.LOCAL_STORAGE
  ]
};

@Injectable({providedIn: 'root'})
export class LocalDataStorage {

  constructor(private platformService: PlatformService, private readonly ngf: NgForage, private readonly cache: NgForageCache) {}

  public clear() {
    this.cache.clear();
    console.log('Cache cleared');
    console.log(this.cache.keys());
  }

  public removeCachedItem(key: string) {
    this.cache.removeCached(key).then(r => console.log(' ---> Item ', r, ' removed'));
  }

  public getKeys(): Observable<string[]> {
    return from(this.cache.keys());
  }

  public getLength(): Observable<number> {
    return from(this.cache.length());
  }

  public setCachedItem<T>(key: string, data: T, cacheTime?: number): Observable<T | null> {
    return from(this.cache.setCached<T>(key, data, cacheTime));
  }

  public getCachedItem<T = any>(key: string): Observable<CachedItem<T> | null> {
    return from(this.cache.getCached<T>(key)).pipe(
      map((r: any) => (!r.hasData || r.expired) ? null : r.data)
    );
  }

  factory(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (this.platformService.isBrowser) {
        console.log('Init localforage');
        this.cache.configure(rootConfig);
        from(this.cache.ready()).pipe(catchError(err => of(console.log(err)))).subscribe(() => {
          console.log('Ready with localforage driver: ', this.cache.activeDriver);
          this.setCachedItem('uuid', uuid.v4());
          resolve(true);
        });
      } else {
        resolve(true);
      }
    });
  }
}

export function configFactory(localDataStorage: LocalDataStorage) {
  return () => localDataStorage.factory();
}

export const LocalDataStorageProvider = [LocalDataStorage, {
  provide: APP_INITIALIZER,
  useFactory: configFactory,
  deps: [LocalDataStorage],
  multi: true
}];

