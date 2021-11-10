import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getName } from '../store/auth.reducer';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAccessGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(getName).pipe(
      map((name: string) => {
        if (!name) {
          this.router.navigateByUrl('');
          return false;
        }
        return true;
      })
    )
  }

}
