// EFFECTS
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {StoreService, StoreActions, log} from '../lib/lib-store-b.service';
import {Action} from '@ngrx/store';
import {EMPTY} from 'rxjs';

@Injectable()
export class Effects implements OnInitEffects {
  all$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.getAll),
      tap( ({type}) => log('action type: ', type)),
      mergeMap(() => {
        return this.storeService.fromApi
          .pipe(
            map((payload) => (StoreActions.success(payload))),
            catchError(() => EMPTY)
          );
      })
    )
  );

  constructor(private actions$: Actions, private storeService: StoreService) {}

  ngrxOnInitEffects(): Action {
    return {type: '[Component B Effects]: Init'};
  }
}
