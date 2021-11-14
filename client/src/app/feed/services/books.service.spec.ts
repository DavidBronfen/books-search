import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BooksService } from './books.service';
import { environment } from '../../../environments/environment';

const TERM = 'new term to search';
const RESPONSE = {
  booksList: [{
    id: 'book id',
    rating: 2,
    title: 'books title',
    subtitle: 'books subtitle',
    description: 'books description',
    authors: 'author 1 author 2',
    pageCount: 340,
    publishedDate: '1/1/1995',
    image: ''
  }]
};

describe('Books service', () => {
  let service: BooksService;
  let httpTestingController: HttpTestingController;
  const serverURL = environment.serverUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BooksService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the books array', waitForAsync(() => {
    service.searchBooksAPI(TERM).subscribe(items => {
      expect(items.booksList.length).toBe(1);
      expect(items.booksList[0].title).toBe(RESPONSE.booksList[0].title);
    });

    const expectedUrl = `${serverURL}/search-books?term=${encodeURIComponent(TERM)}`;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(RESPONSE);
    httpTestingController.verify();
  }));
});
