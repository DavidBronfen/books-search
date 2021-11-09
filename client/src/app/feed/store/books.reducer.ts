import { IBooksModel } from '../models/books.model';
import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

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
      term: payload.term,
      booksList: payload.booksList,
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
const booksState = createFeatureSelector<State>('books');

export const getBooksList = createSelector(booksState, (state: IBooksModel) => state.booksList);
export const isLoadingBooks = createSelector(booksState, (state: IBooksModel) => state.isLoading);

