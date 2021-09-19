import {
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  AfterViewInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { forkJoin, Subject, Subscription, } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { getBooksList, isLoadingBooks } from '../../store/books.reducer';
import { IBookItemModel } from '../../models/books.model';
import { ImageDirective } from '../../directives/image.directive';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class BooksListComponent implements OnInit, OnDestroy, AfterViewInit {
  unsubscribe$: Subject<void> = new Subject<void>();
  books: IBookItemModel[];
  loading: boolean;
  subscription: Subscription;
  @ViewChildren(ImageDirective) images: QueryList<ImageDirective>;
  placeholderImage = '../../../assets/no_image.jpg';

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store
      .select(getBooksList)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(booksListState => this.books = booksListState);

    this.store
      .select(isLoadingBooks)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(loaderState => this.loading = loaderState)
  }

  resizeAllGridItems() {
    const allItems = document.getElementsByClassName("item");
    for (let x = 0; x < allItems.length; x++) {
      this.resizeGridItem(allItems[x]);
    }
  }

  ngAfterViewInit(): void {
    this.subscription = this.images.changes.subscribe(res => {
      forkJoin(this.images.map(imgDir => imgDir.loaded)).subscribe(() => {
        console.log('all images have been loaded');
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
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showWelcome(): boolean {
    return this.books === null && !this.loading
  }

  onResize() {
    this.resizeAllGridItems();
  }
}
