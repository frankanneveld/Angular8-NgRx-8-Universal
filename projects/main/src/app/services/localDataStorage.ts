import {Injectable} from '@angular/core';
import {CachedItem, NgForage, NgForageCache} from 'ngforage';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class LocalDataStorage {

  constructor(private readonly ngf: NgForage, private readonly cache: NgForageCache) {
  }

  public getKeys(): Observable<string[]> {
    return from(this.ngf.keys());
  }

  public setItem(key: string, item: any) {
    this.ngf.setItem(key, item);
  }

  public getItem<T = any>(key: string): Observable<T | null> {
    return from(this.ngf.getItem<T>(key));
  }

  public setCachedItem<T>(key: string, data: T, cacheTime?: number): Observable<T | null> {
    return from(this.cache.setCached<T>(key, data, cacheTime));
  }

  public getCachedItem<T = any>(key: string): Observable<CachedItem<T> | null> {
    return from(this.cache.getCached<T>(key)).pipe(
      map((r: any) => (!r.hasData || r.expired) ? null : r.data)
    );
  }


  // ToDo : Implement some extra features
  public clearItem() {}
  public flush() {}
}
