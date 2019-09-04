import {Action, createReducer, on} from '@ngrx/store';
import {CopyActions} from './copy.service';

export interface CopyState {
  keys: { [key: string]: any };
}

export const initialCopyState: CopyState = {
  keys: null
};

const copyReducer = createReducer(
  initialCopyState,
  on(CopyActions.copySuccess, (state, keys) => ({...state, keys}))
);

export function reducer(state: CopyState | undefined, action: Action) {
  return copyReducer(state, action);
}
