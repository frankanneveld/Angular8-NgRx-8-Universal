import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {CopyTransferkeys} from './copy.transferkeys';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable()
export class CopyService {
  constructor(private transferState: CopyTransferkeys, private http: HttpClient, private store: Store<any>) {}

  public setCopy(copyItems: any) {
    // this.store.dispatch(copySuccess(copyItems));
  }

  public getCopyFromApi(onServer: boolean = false): Observable<any> {
    if (onServer) this.transferState.serverLoadKey = onServer;
    return this.http.get('https://test-vergelijken.eindelijkglasvezel.nl/api/v1/copy', {params: {namespace: 'frontend'}}).pipe(
      map( (res: any) => res.items)
    );
  }



  // public get copySubscription(): Observable<any> {
  //   // return this.store.pipe(select(copy.selectFeatureCopy));
  // }

  public getAll(onServer: boolean = false) {
    return 'get all copy';
  }
}
