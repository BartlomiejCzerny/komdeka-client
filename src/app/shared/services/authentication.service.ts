import { TwoFactorDto } from './../../interfaces/two-factor/two-factor-dto.interface';
import { CustomEncoder } from './../custom-encoders/custom-encoder';
import { ResetPasswordDto } from './../../interfaces/reset-password/reset-password-dto.interface';
import { RegistrationResponseDto } from './../../interfaces/response/registration-response-dto.interface';
import { UserForRegistrationDto } from './../../interfaces/user/user-for-registration-dto.interface';
import { UserForAuthenticationDto } from './../../interfaces/user/user-for-authentication-dto.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from './environment-url.service';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountRecoveryDto } from '../../interfaces/reset-password/account-recovery-dto.interface';
import { AuthResponseDto } from './../../interfaces/response/auth-response-dto.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authChangeSub = new Subject<boolean>();
  authChanged = this.authChangeSub.asObservable();

  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService,
    private jwtHelper: JwtHelperService
  ) { }

  register(route: string, body: UserForRegistrationDto) {
    return this.http.post<RegistrationResponseDto> (this.createCompleteRoute(route, this.envUrl.urlAddress), body);
  }

  login(route: string, body: UserForAuthenticationDto) {
    localStorage.setItem('e-mail', body.email);
    return this.http.post<AuthResponseDto> (this.createCompleteRoute(route, this.envUrl.urlAddress), body);
  }

  sendAuthStateChangeNotification(isAuthenticated: boolean) {
    this.authChangeSub.next(isAuthenticated);
  }

  logout() {
    localStorage.removeItem('e-mail');
    localStorage.removeItem('token');
    this.sendAuthStateChangeNotification(false);
  }

  twoStepLogin(route: string, body: TwoFactorDto) {
    return this.http.post<AuthResponseDto>(this.createCompleteRoute(route, this.envUrl.urlAddress), body);
  }

  activateAccount(route: string, token: string, email: string) {
    let params = new HttpParams({ encoder: new CustomEncoder() })
    params = params.append('token', token);
    params = params.append('email', email);

    return this.http.get(this.createCompleteRoute(route, this.envUrl.urlAddress), { params: params });
  }

  accountRecovery(route: string, body: AccountRecoveryDto) {
    return this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress), body);
  }

  resetPassword(route: string, body: ResetPasswordDto) {
    return this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress), body);
  }

  isUserAuthenticated(): any {
    const token = localStorage.getItem('token');
    return token && !this.jwtHelper.isTokenExpired(token);
  };

  isUserAdmin(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      return role === 'Administrator';
    }
  }

  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }
}
