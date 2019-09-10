import {Action, createReducer, on} from '@ngrx/store';
import {StoreActions} from '../src/lib/lib-store-c.service';




export interface State {
  data: { [key: string]: any };
}

export const initialState: State = {
  data: null
};

const reducerCreate = createReducer(
  initialState,
  on(StoreActions.success, (state, data) => {
    console.log('Reducer > ', data);
    return ({...state, data});
  })
);

export function reducer(state: State | undefined, action: Action) {
  return reducerCreate(state, action);
}