import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { IWishListBookItemModel } from '../../models/wishlist.model';
import { getWishlist } from '../../store/wishlist.reducer';
import { RemoveFromWishlist } from '../../store/wishlist.actions';
import { getName } from '../../../auth/store/auth.reducer';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistComponent implements OnInit {
  placeholderImage = 'assets/no_image.jpg';
  wishlist$: Observable<IWishListBookItemModel[]>;
  name$: Observable<string>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.wishlist$ = this.store.select(getWishlist);
    this.name$ = this.store.select(getName);
  }

  removeToWishList(id: string): void {
    this.store.dispatch(RemoveFromWishlist({id}));
  }
}
