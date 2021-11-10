import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserAccessGuard } from './auth/guards/user-access.guard';

const routes: Routes = [
  { path: '',  redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule) },
  {
    path: 'feed',
    loadChildren: () => import('./feed/feed.module').then(module => module.FeedModule),
    canActivate: [ UserAccessGuard ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
