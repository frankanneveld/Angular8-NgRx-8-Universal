// EFFECTS
import {Injectable} from '@angular/core';
import {CopyService, CopyActions} from './copy.service';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {Action} from '@ngrx/store';

@Injectable()
export class CopyEffects implements OnInitEffects {
  allCopy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CopyActions.copyGetAll),
      mergeMap(() => {
        return this.copyService.copyFromApi
          .pipe(
            map((payload) => (CopyActions.copySuccess(payload))),
            catchError(() => EMPTY)
          );
      })
    )
  );

  constructor(private actions$: Actions, private copyService: CopyService) {}

  ngrxOnInitEffects(): Action {
    return {type: '[Copy Effects]: Init'};
  }
}
