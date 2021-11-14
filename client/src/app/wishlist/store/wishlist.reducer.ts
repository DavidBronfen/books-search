import { IWishListModel } from '../models/wishlist.model';
import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as WishlistActions from './wishlist.actions';

export type State = IWishListModel;

export const initialState: Readonly<State> = {
  myList: []
};

const wishListReducer = createReducer(
  initialState,
  on(
    WishlistActions.AddToWishlist,
    (state, payload): State => ({
      myList: [
        ...state.myList,
        payload
      ]
    })
  ),
  on(
    WishlistActions.RemoveFromWishlist,
    (state, payload): State => ({
      myList: state.myList.filter(item => item.id !== payload.id)
    })
  )
);

export const reducer = (state: State, action: Action): State => wishListReducer(state, action);
const wishListState = createFeatureSelector<State>('wishlist');

export const isItemInWishlist = (itemID: string) =>
  createSelector(
  wishListState,
  (state: IWishListModel) => state.myList.some(item => item.id === itemID)
);

export const isWishlistExists = createSelector(
    wishListState,
    (state: IWishListModel) => !!state.myList.length
);

export const getWishlist = createSelector(
  wishListState,
  (state: IWishListModel) => state.myList
);
