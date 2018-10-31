import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { CookieService } from 'ngx-cookie';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.cookieService.get('userId')) {
      // Set loggedIn to true
      this.userService.loggedIn = true;

      return true;
    }

    // Save redirect URL
    this.userService.returnUrl = state.url;

    // Set loggedIn to false
    this.userService.loggedIn = false;

    // Navigate to the login page
    this.router.navigate(['/login']);
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }
}
