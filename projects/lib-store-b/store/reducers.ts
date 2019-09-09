import {Action, createReducer, on} from '@ngrx/store';
import {StoreActions} from '../../lib-store-b/src/lib/lib-store-b.service';




export interface State {
  keys: { [key: string]: any };
}

export const initialState: State = {
  keys: null
};

const reducerCreate = createReducer(
  initialState,
  on(StoreActions.success, (state, keys) => ({...state, keys}))
);

export function reducer(state: State | undefined, action: Action) {
  return reducerCreate(state, action);
}
