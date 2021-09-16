import { ActionReducerMap } from '@ngrx/store';
import * as fromBooks from './books.reducer';

export interface IAppState {
  books: fromBooks.State;
}

export const reducers: ActionReducerMap<IAppState> = {
  books: fromBooks.reducer
}
