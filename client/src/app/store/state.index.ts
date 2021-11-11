import { ActionReducerMap } from '@ngrx/store';

import * as fromBooks from '../feed/store/books.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromWishlist from '../wishlist/store/wishlist.reducer';

export interface IAppState {
  books: fromBooks.State;
  auth: fromAuth.State;
  wishlist: fromWishlist.State
}

export const reducers: ActionReducerMap<IAppState> = {
  books: fromBooks.reducer,
  auth: fromAuth.reducer,
  wishlist: fromWishlist.reducer
}
