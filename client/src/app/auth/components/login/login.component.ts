import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginUser } from '../../store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  name: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z\s]*$/)
  ]);

  constructor(private store: Store) {}

  ngOnInit(): void {
  }

  submitUSer(): void {
    if (this.name.valid) {
      this.store.dispatch(LoginUser({ name: this.name.value }));
    }
  }
}
