import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {createAction, props, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {CopyTransferkeys} from './copy.transferkeys';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {isPlatformServer} from '@angular/common';

export class CopyActions {
  static copyGetAll = createAction('[Copy Get All]');
  static copySuccess = createAction('[Copy Success]', props<{ copy: any }>());
}


@Injectable()
export class CopyService {

  public get copyFromApi(): Observable<any> {
    return this.http.get('https://test-vergelijken.eindelijkglasvezel.nl/api/v1/copy', {params: {namespace: 'frontend'}}).pipe(
      map((res: any) => res.items)
    );
  }

  constructor(@Inject(PLATFORM_ID) private platformId: string,
              private copyTransferkeys: CopyTransferkeys,
              private http: HttpClient,
              private store: Store<any>) {
  }

  // public setCopy(copyItems: any) {
  //   // this.store.dispatch(copySuccess(copyItems));
  // }
  //
  // public get copySubscription(): Observable<any> {
  //   return of(EMPTY); // this.store.pipe(select(copy.selectFeatureCopy));
  // }

  public getAllCopy() {
    if (isPlatformServer(this.platformId)) {
      this.copyFromApi.subscribe(copy => this.copyTransferkeys.copyTransferKey = copy);
    } else if (this.copyTransferkeys.hasCopyTransferKey) {
      this.store.dispatch(CopyActions.copySuccess(this.copyTransferkeys.copyTransferKey));
    } else {
      this.store.dispatch(CopyActions.copyGetAll());
    }
  }
}


// if (isPlatformServer(this.platformId)) {
//   this.http.get('https://test-vergelijken.eindelijkglasvezel.nl/api/v1/copy', {params: {namespace: 'frontend'}}).pipe(
//     map( (res: any) => res.items)).subscribe(this.transferState.copyTransferKey);
// }
//
// if (isPlatformBrowser(this.platformId)) {
//   return of(EMPTY);
// }

// return this.http.get('https://test-vergelijken.eindelijkglasvezel.nl/api/v1/copy', {params: {namespace: 'frontend'}}).pipe(
//   map( (res: any) => res.items)
// );}


// // getAll
// public getCopy(): void {
//   // this.hasPrefetch ->
//   if (isPlatformServer(this.platformId)) {
//   this.getCopyFromApi().subscribe( copy => { this.copyTransferkeys.serverLoadKey = true; this.copyTransferkeys.copyKey = copy; });
// } else if (this.copyTransferkeys.serverLoadKey) {
//   this.store.dispatch(CopyActions.success(this.copyTransferkeys.));
// } else {
//   this.store.dispatch(CopyActions.get());
// }
// // else
// }
// }
