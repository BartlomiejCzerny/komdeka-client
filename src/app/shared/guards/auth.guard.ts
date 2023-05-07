import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.isUserAuthenticated()) {
      return true;
    }

    this.router.navigate(['/forbidden'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}
