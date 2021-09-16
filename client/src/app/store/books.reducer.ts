import { IBooksModel } from '../models/books.model';
import { Action, createReducer, on } from '@ngrx/store';

import * as BooksActions from './books.actions';

export type State = IBooksModel;

export const initialState: Readonly<State> = {
  term: null,
  booksList: null
}

const booksReducer = createReducer(
  initialState,
  on(
    BooksActions.SearchBooks,
    (state, payload): State => ({
      term: payload.term,
      booksList: null
    })
  ),
  on(
    BooksActions.SearchBooksSuccess,
    (state, payload): State => ({
      ...payload
    }),

  )
)

export const reducer = (state: State, action: Action): State => booksReducer(state, action);
