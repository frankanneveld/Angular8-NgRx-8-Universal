import { APP_INITIALIZER, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CachedItem, Driver, NgForage, NgForageCache, NgForageOptions } from 'ngforage';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as uuid from 'uuid';

const rootConfig: NgForageOptions = {
  name: 'frank-store-test',
  cacheTime: 30000,
  driver: [
    Driver.INDEXED_DB,
    Driver.WEB_SQL,
    Driver.LOCAL_STORAGE
  ]
};

export function configFactory(localDataStorage: LocalDataStorage) {
  return () => localDataStorage.init();
}

@Injectable({providedIn: 'root'})
export class LocalDataStorage {

  private ready: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: string, private readonly ngf: NgForage, private readonly cache: NgForageCache) {
    console.log('Init localforage');
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
    this.cache.configure(rootConfig);
    from(this.cache.ready()).pipe(catchError(err => of(console.log(err)))).subscribe(() => {
      this.ready = true;
      console.log('Ready with storage driver: ', this.cache.activeDriver);
    });
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        this.setCachedItem('store', {id: uuid.v4()});
        resolve(true);
      }, 0);
    });
  }
}

export const LocalDataStorageProvider = [LocalDataStorage, {
    provide: APP_INITIALIZER,
    useFactory: configFactory,
    deps: [LocalDataStorage],
    multi: true
  }
];

