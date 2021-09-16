import { IBooksModel } from '../models/books.model';
import { Action, createReducer, on } from '@ngrx/store';

import * as BooksActions from './books.actions';

export type State = IBooksModel;

export const initialState: Readonly<State> = {
  term: null,
  booksList: null,
  isLoading: null,
  isError: null
}

const booksReducer = createReducer(
  initialState,
  on(
    BooksActions.SearchBooks,
    (state, payload): State => ({
      term: payload.term,
      booksList: null,
      isLoading: true,
      isError: false
    })
  ),
  on(
    BooksActions.SearchBooksSuccess,
    (state, payload): State => ({
      ...payload,
      isLoading: false,
      isError: false
    })
  ),
  on(
    BooksActions.SearchBooksFailed,
    (state): State => ({
      ...state,
      booksList: null,
      isLoading: false,
      isError: true
    })
  )
)

export const reducer = (state: State, action: Action): State => booksReducer(state, action);
