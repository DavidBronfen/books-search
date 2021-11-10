import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { LoginComponent } from './components/login/login.component';
import { AnimatedBackgroundComponent } from './components/animated-background/animated-background.component';

import { reducer } from './store/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './store/auth.effect';

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
    MatButtonModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([AuthEffect]),
  ]
})
export class WelcomeModule { }
