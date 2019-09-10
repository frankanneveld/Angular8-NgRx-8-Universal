// EFFECTS
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {catchError, map, mapTo, mergeMap, tap} from 'rxjs/operators';

import {Action} from '@ngrx/store';
import {EMPTY, of} from 'rxjs';
import {log, StoreActions, StoreService} from '../src/lib/lib-store-c.service';


@Injectable()
export class Effects implements OnInitEffects {
  all$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.getAll),
      tap( ({type}) => log('action type: ', type)),
      mergeMap(() => {
        return this.storeService.fromApi
          .pipe(
            // merge extra data into source WARNING this only works in browser mode
            // to work with extra data to the source use mergeMap in the http response
            mergeMap( (payload) => of({...payload, frank: 'txt'})),
            map((payload) => (StoreActions.success(payload))),
            catchError(() => EMPTY)
          );
      })
    )
  );

  constructor(private actions$: Actions, private storeService: StoreService) {}

  ngrxOnInitEffects(): Action {
    return {type: '[STORE C Effects]: Init'};
  }
}