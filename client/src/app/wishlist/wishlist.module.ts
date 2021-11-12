import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

import { WishlistComponent } from './components/wishlist/wishlist.component';
import { WishlistRoutingModule } from './wishlist-routing.module';
import { reducer } from './store/wishlist.reducer';

@NgModule({
  declarations: [
    WishlistComponent
  ],
  imports: [
    CommonModule,
    WishlistRoutingModule,
    StoreModule.forFeature('wishlist', reducer),
    EffectsModule.forFeature([]),
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
  ]
})
export class WishlistModule {}
