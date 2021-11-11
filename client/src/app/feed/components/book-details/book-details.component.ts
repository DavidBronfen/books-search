import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { IBookItemModel } from '../../models/books.model';

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
  ) { }

  closeDialog() {
    this.dialogRef.close();
  }

  addToWishList() {
    console.log(this.book.id);
  }
}
