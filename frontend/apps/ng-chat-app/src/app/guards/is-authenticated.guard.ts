import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root',
})
export class IsAuthenticatedGuard implements CanActivate, CanActivateChild {
  constructor(private readonly securityService: SecurityService, private readonly router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.internalCanActivate();
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.internalCanActivate();
  }

  private internalCanActivate(): Observable<boolean | UrlTree> {
    return this.securityService.isAuthenticated$.pipe(map(state => {
      if (state) {
        return true;
      }

      return this.router.createUrlTree(['/login']);
    }));
  }
}
