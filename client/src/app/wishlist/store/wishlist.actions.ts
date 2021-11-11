import { createAction, props } from '@ngrx/store';
import { IWishListBookItemModel } from '../models/wishlist.model';

export const AddToWishlist = createAction(
  '[Wishlist] Add to wishlist',
  props<IWishListBookItemModel>()
);

export const RemoveFromWishlist = createAction(
  '[Wishlist] Remove from wishlist',
  props<{id: string}>()
);
