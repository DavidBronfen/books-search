import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { LoginComponent } from './components/login/login.component';
import { AnimatedBackgroundComponent } from './components/animated-background/animated-background.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    LoginComponent,
    AnimatedBackgroundComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class WelcomeModule { }
