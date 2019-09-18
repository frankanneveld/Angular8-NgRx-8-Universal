// EFFECTS
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { StoreActions, StoreService } from '../src/lib/lib-store-a.service';

@Injectable()
export class Effects implements OnInitEffects {
  all$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.getAll),
      tap(({type}) => console.log('action type: ', type)),
      mergeMap(() => {
        return this.storeService.fromApi
          .pipe(
            map((payload: any) => (StoreActions.success(payload))),
            tap((payload: any) => this.storeService.setCached(payload)),
            catchError(() => EMPTY)
          );
      })
    )
  );

  constructor(private actions$: Actions, private storeService: StoreService) {
  }

  ngrxOnInitEffects(): Action {
    return {type: '[STORE A Effects]: Init'};
  }
}
