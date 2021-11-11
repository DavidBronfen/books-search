import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

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
  ]
})
export class WishlistModule {}
