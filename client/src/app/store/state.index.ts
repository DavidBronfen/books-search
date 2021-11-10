import { ActionReducerMap } from '@ngrx/store';
import * as fromBooks from '../feed/store/books.reducer';
import * as fromAuth from '../auth/store/auth.reducer';

export interface IAppState {
  books: fromBooks.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<IAppState> = {
  books: fromBooks.reducer,
  auth: fromAuth.reducer
}
