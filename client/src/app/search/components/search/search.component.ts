import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ClearSearch, SearchBooks } from '../../../feed/store/books.actions';
import { getName } from '../../../auth/store/auth.reducer';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  name$: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {

    this.name$ = this.store.select(getName);

    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((term: string) => term ?
      this.store.dispatch(SearchBooks({ term })) :
      this.store.dispatch(ClearSearch())
    )
  }

  displayButton(): boolean {
    return this.searchControl.value
  }

  resetSearchTerm(): void {
    this.searchControl.reset();
    this.store.dispatch(ClearSearch());
  }
}
