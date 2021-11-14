import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import * as AuthActions from './auth.actions';
import { catchError, map, tap } from 'rxjs/operators';
import { getName } from './auth.reducer';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private store: Store,
    private router: Router,
  ) {}

  loginUser$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.LoginUser),
      concatLatestFrom(() => this.store.select(getName)),
      tap(([_, name]) => {
        if (name) {
          this.router.navigateByUrl('feed');
        }
      }),
      catchError((err) => of(err))
    );
  }, { dispatch: false });
}

