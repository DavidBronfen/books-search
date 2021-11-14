import { Component, ChangeDetectionStrategy, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { IBookItemModel } from '../../models/books.model';
import { Store } from '@ngrx/store';
import { IWishListBookItemModel } from '../../../wishlist/models/wishlist.model';
import { AddToWishlist, RemoveFromWishlist } from '../../../wishlist/store/wishlist.actions';
import { Observable } from 'rxjs';
import { isItemInWishlist } from '../../../wishlist/store/wishlist.reducer';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent implements OnInit {
  isItemInWishlist$: Observable<boolean>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public book: IBookItemModel,
    public dialogRef: MatDialogRef<BookDetailsComponent>,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.isItemInWishlist$ = this.store.select(isItemInWishlist(this.book.id));
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addToWishList(): void {
    const bookToWishList: IWishListBookItemModel = {
      id: this.book.id,
      title: this.book.title,
      image: this.book.image
    };

    this.store.dispatch(AddToWishlist(bookToWishList));
    this.closeDialog();
  }


  removeToWishList(): void {
    this.store.dispatch(RemoveFromWishlist({id: this.book.id}));
    this.closeDialog();
  }
}
