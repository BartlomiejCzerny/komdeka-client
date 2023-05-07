import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard  {

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.isUserAdmin())
      return true;

    this.router.navigate(['/forbidden'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
