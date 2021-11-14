import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { BookCardComponent } from './book-card.component';
import { IBookItemModel } from '../../models/books.model';
import { ImageDirective } from '../../directives/image.directive';

const BOOK: IBookItemModel = {
  id: 'id',
  title: 'book title',
  subtitle: 'book subtitle',
  image: 'assets/no_image.jpg',
  publishedDate: '123',
  pageCount: 123,
  rating: 5,
  authors: 'authors',
  description: 'description'
};

describe('Book card', () => {

  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BookCardComponent,
        ImageDirective
      ],
      imports: [
        CommonModule,
        MatCardModule,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
    fixture.componentInstance.book = BOOK;
    fixture.detectChanges();
  });

  it('should create the Book-card component', () => {
    expect(component).toBeTruthy();
  });

  it('should have book object', () => {
    expect(component.book).toEqual(BOOK);
  });

  it(`should have title 'book title'`, () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card-title').textContent).toContain(BOOK.title);
  });
});
