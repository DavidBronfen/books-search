import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export type State = { name: string; }

export const initialState: Readonly<State> = {
  name: null
}

const authReducer = createReducer(
  initialState,
  on(
    AuthActions.LoginUser,
    (state, payload): State => ({
      ...state,
      name: payload.name
    })
  )
)

export const reducer = (state: State, action: Action): State => authReducer(state, action);
const authState = createFeatureSelector<State>('auth');

export const getName = createSelector(authState, (state: State) => state.name)
