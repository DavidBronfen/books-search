import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISearchResponseModel } from '../models/books.model';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BooksService {
  serverURL
  constructor(private http: HttpClient) {
    this.serverURL = environment.serverUrl;
  }

  searchBooksAPI(term: string): Observable<ISearchResponseModel> {
    const params = new HttpParams().set('term', term);
    return this.http.get<ISearchResponseModel>(`${this.serverURL}/search-books`, { params });
  }
}
