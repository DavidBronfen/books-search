import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { FlexModule } from '@angular/flex-layout';

import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [ SearchComponent ],
  exports: [ SearchComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FlexModule,
  ]
})
export class SearchModule { }
