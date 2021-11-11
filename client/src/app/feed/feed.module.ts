import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { FeedRoutingModule } from './feed-routing.module';
import { SearchModule } from '../search/search.module';

import { ImageDirective } from './directives/image.directive';

import { FeedComponent } from './components/feed/feed.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';

import { BooksEffect } from './store/books.effect';
import { reducer } from './store/books.reducer';


@NgModule({
  declarations: [
    FeedComponent,
    BooksListComponent,
    BookCardComponent,
    ImageDirective,
    BookDetailsComponent,
  ],
  imports: [
    CommonModule,
    FeedRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    StoreModule.forFeature('books', reducer),
    EffectsModule.forFeature([ BooksEffect ]),
    SearchModule,
  ],
})
export class FeedModule { }
