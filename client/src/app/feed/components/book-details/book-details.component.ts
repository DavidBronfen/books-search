import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { IBookItemModel } from '../../models/books.model';
import { Store } from '@ngrx/store';
import { IWishListBookItemModel } from '../../../wishlist/models/wishlist.model';
import { AddToWishlist } from '../../../wishlist/store/wishlist.actions';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public book: IBookItemModel,
    public dialogRef: MatDialogRef<BookDetailsComponent>,
    private store: Store
  ) { }

  closeDialog() {
    this.dialogRef.close();
  }

  addToWishList() {
    const bookToWishList: IWishListBookItemModel = {
      id: this.book.id,
      title: this.book.title,
      image: this.book.image
    }

    this.store.dispatch(AddToWishlist(bookToWishList));
    this.closeDialog();
  }
}
