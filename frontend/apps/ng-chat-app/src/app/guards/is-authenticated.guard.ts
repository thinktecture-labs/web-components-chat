import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SecurityService } from '../../../projects/core/src/lib/services/security.service';

@Injectable({
  providedIn: 'root',
})
export class IsAuthenticatedGuard implements CanActivate, CanActivateChild {
  constructor(private readonly securityService: SecurityService, private readonly router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.internalCanActivate(state.url);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.internalCanActivate(state.url);
  }

  private internalCanActivate(redirectUri: string): Observable<boolean | UrlTree> {
    return this.securityService.isAuthenticated$.pipe(map(state => {
      if (state) {
        return true;
      }

      return this.router.createUrlTree(['/login'], { queryParams: { redirectUri } });
    }));
  }
}
