// EFFECTS
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {FrankStoreService, StoreActions, log} from '../lib/frank-store.service';
import {Action} from '@ngrx/store';
import {EMPTY} from 'rxjs';

@Injectable()
export class FrankEffects implements OnInitEffects {
  all$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.getAll),
      tap( ({type}) => log('action type: ', type)),
      mergeMap(() => {
        return this.frankStoreService.fromApi
          .pipe(
            map((payload) => (StoreActions.success(payload))),
            catchError(() => EMPTY)
          );
      })
    )
  );

  constructor(private actions$: Actions, private frankStoreService: FrankStoreService) {}

  ngrxOnInitEffects(): Action {
    return {type: '[Frank Effects]: Init'};
  }
}
