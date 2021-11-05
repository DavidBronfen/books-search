import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { Store } from '@ngrx/store';
import { forkJoin, Observable, Subscription } from 'rxjs';

import { getBooksList, isLoadingBooks } from '../../store/books.reducer';
import { IBookItemModel } from '../../models/books.model';
import { ImageDirective } from '../../directives/image.directive';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class BooksListComponent implements OnInit, OnDestroy, AfterViewInit {
  books$: Observable<IBookItemModel[]>;
  loading$: Observable<boolean>;

  subscription: Subscription;
  @ViewChildren(ImageDirective) images: QueryList<ImageDirective>;
  placeholderImage = 'assets/no_image.jpg';

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.books$ = this.store.select(getBooksList)
    this.loading$ = this.store.select(isLoadingBooks);
  }

  resizeAllGridItems() {
    const allItems = document.getElementsByClassName("item");
    for (let x = 0; x < allItems.length; x++) {
      this.resizeGridItem(allItems[x]);
    }
  }

  ngAfterViewInit(): void {
    this.subscription = this.images.changes
      .subscribe(() => {
        forkJoin(this.images.map(imgDir => imgDir.loaded))
          .subscribe(() => {
            this.resizeAllGridItems();
          });
      });
  }

  resizeGridItem(item: Element) {
    const grid = document.getElementsByClassName("grid")[0];
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    const rowSpan = Math.ceil((item.querySelector('.content')
      .getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
    (item as HTMLElement).style.gridRowEnd = "span " + rowSpan;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onResize() {
    this.resizeAllGridItems();
  }

  showWelcome(data: { books: IBookItemModel[] | null; loading: boolean | null }): boolean {
    return data.books === null && !data.loading
  }

  showNoResults(data: { books: IBookItemModel[] | null; loading: boolean | null }): boolean {
    return data.books && data.books.length === 0 && !data.loading;
  }

  showResults(data: { books: IBookItemModel[] | null; loading: boolean | null }) {
    return data.books && data.books.length && !data.loading;
  }
}
