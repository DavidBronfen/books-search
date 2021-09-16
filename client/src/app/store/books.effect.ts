import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

import * as BooksActions from './books.actions';
import { BooksService } from '../services/books.service';

@Injectable({
  providedIn: 'root'
})
export class BooksEffect {
  constructor(
    private actions$: Actions,
    private booksService: BooksService
    ) {}

  searchBooks$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksActions.SearchBooks),
      map(action => action.term),
      switchMap(term =>
        this.booksService.searchBooksAPI(term).pipe(
          map(response => BooksActions.SearchBooksSuccess(response)),
          catchError((error: Error) => of(BooksActions.SearchBooksFailed({ error })))
        )
      )
    )
  })
}
