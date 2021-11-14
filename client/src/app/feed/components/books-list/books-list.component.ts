import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getBooksList, isLoadingBooks } from '../../store/books.reducer';
import { IBookItemModel } from '../../models/books.model';
import { BookCardComponent } from '../book-card/book-card.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BookDetailsComponent } from '../book-details/book-details.component';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class BooksListComponent implements OnInit {

  @ViewChildren(BookCardComponent) bookCards: QueryList<BookCardComponent>;

  books$: Observable<IBookItemModel[]>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store,
    private renderer: Renderer2,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.books$ = this.store.select(getBooksList);
    this.loading$ = this.store.select(isLoadingBooks);
  }

  onResize(): void {
    this.resizeAllGridItems();
  }

  resizeAllGridItems(): void {
    // Do nothing when one of the cards is still loading an image.
    if (this.bookCards.some(card => card.loadingImage)) {
      return;
    }
    this.bookCards.map(card => this.resizeGridItem(card.elementRef.nativeElement));
  }

  resizeGridItem(item: HTMLElement): void {
    const grid = document.getElementsByClassName('grid')[0];
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'), 10);
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'), 10);
    const rowSpan = Math.ceil((item.querySelector('.content')
      .getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));

    this.renderer.setStyle(item, 'grid-row-end', `span ${rowSpan}`);
  }

  showWelcome(data: { books: IBookItemModel[] | null; loading: boolean | null }): boolean {
    return data.books === null && !data.loading;
  }

  showNoResults(data: { books: IBookItemModel[] | null; loading: boolean | null }): boolean {
    return data.books && data.books.length === 0 && !data.loading;
  }

  showResults(data: { books: IBookItemModel[] | null; loading: boolean | null }): boolean {
    return data.books && data.books.length && !data.loading;
  }

  getBooksInfo(book: IBookItemModel): void {
    this.dialog.open(BookDetailsComponent, {
      panelClass: 'book-details',
      disableClose: true,
      data: book
    });
  }
}
