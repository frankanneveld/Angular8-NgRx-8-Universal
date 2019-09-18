/*
** LocalForage implementation
** install: npm install localforage@^1.5.0 ngforage@^5.0.0
** usage: via setCachedItem and sgetCachedItem etc.
** This service will boot before Angular is up and running
*/
import { APP_INITIALIZER, Injectable } from '@angular/core';
import { CachedItem, Driver, NgForage, NgForageCache, NgForageOptions } from 'ngforage';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as uuid from 'uuid';
import { PlatformService } from './platform.service';

const rootConfig: NgForageOptions = {
  name: 'frank-store-test',
  cacheTime: 30000,
  driver: [
    Driver.INDEXED_DB,
    Driver.WEB_SQL,
    Driver.LOCAL_STORAGE
  ]
};


@Injectable({providedIn: 'root'})
export class LocalDataStorage {

  constructor(private platformService: PlatformService, private readonly ngf: NgForage, private readonly cache: NgForageCache) {


  }

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

  // public setItem(key: string, item: any) {
  //   if (isPlatformBrowser(this.platformId) && this.ready) {
  //     this.ngf.removeItem(key);
  //     this.ngf.setItem(key, item).then( res => console.log(`--->  setItem ${key} `, res));
  //   }
  // }
  //
  // public getItem<T = any>(key: string): Observable<T | null> {
  //   return (isPlatformBrowser(this.platformId)) ? from(this.ngf.getItem<T>(key)) : from(EMPTY);
  // }

  // public set cachedItem() {}
  // public get cachedItem() {}

  public setCachedItem<T>(key: string, data: T, cacheTime?: number): Observable<T | null> {
    return from(this.cache.setCached<T>(key, data, cacheTime));
  }

  public getCachedItem<T = any>(key: string): Observable<CachedItem<T> | null> {
    return from(this.cache.getCached<T>(key)).pipe(
      map((r: any) => (!r.hasData || r.expired) ? null : r.data)
    );
  }


  init(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (this.platformService.isBrowser) {
        console.log('Init localforage');
        this.cache.configure(rootConfig);
        from(this.cache.ready()).pipe(catchError(err => of(console.log(err)))).subscribe(() => {
          console.log('Ready with storage driver: ', this.cache.activeDriver);
          this.setCachedItem('init', uuid.v4());
          resolve(true);
        });
      } else {
        resolve(true);
      }
    });
  }
}

export function configFactory(localDataStorage: LocalDataStorage) {
  return () => localDataStorage.init();
}

export const LocalDataStorageProvider = [LocalDataStorage, {
  provide: APP_INITIALIZER,
  useFactory: configFactory,
  deps: [LocalDataStorage],
  multi: true
}
];

