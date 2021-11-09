import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  name: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z]*')
  ]);

  constructor() { }

  ngOnInit(): void {
  }

}
