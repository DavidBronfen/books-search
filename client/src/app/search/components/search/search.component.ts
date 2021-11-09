import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { SearchBooks } from '../../../feed/store/books.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  searchBooksForm: FormGroup;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.searchBooksForm = new FormGroup({
      searchTerm: new FormControl(null, [Validators.required])
    });
  }

  get searchTerm(): AbstractControl {
    return this.searchBooksForm.get('searchTerm') as AbstractControl;
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.searchBooksForm.controls[controlName].hasError(errorName);
  }

  displayButton(): boolean {
    return this.searchTerm.value
  }

  resetSearchTerm(): void {
    this.searchTerm.reset();
  }

  searchBooks(): void {
    this.store.dispatch(SearchBooks({ term: this.searchTerm.value }))
  }

  isDisabled(): boolean {
    return !this.searchBooksForm.valid
  }
}
