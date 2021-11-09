import { createAction, props } from '@ngrx/store';
import { ISearchResponseModel, ISearchRequestModel } from '../models/books.model';

export const SearchBooks = createAction(
  '[Books] Search',
  props<ISearchRequestModel>()
);

export const SearchBooksSuccess = createAction(
  '[Books] Search success',
  props<ISearchResponseModel>()
);

export const SearchBooksFailed = createAction(
  '[Books] Search failed',
  props<{ error: Error }>()
);
