import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchBooksForm: FormGroup;

  constructor() {
    this.searchBooksForm = new FormGroup({
      searchTerm: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {}

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
    console.log(this.searchTerm.value);
  }

  isDisabled(): boolean {
    return !this.searchBooksForm.valid
  }
}
