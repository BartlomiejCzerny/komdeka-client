import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { UserForAuthenticationDto } from './../../interfaces/user/user-for-authentication-dto.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  email: UntypedFormControl;
  password: UntypedFormControl;

  hidePassword = true;

  errorMessage: string;
  showError: boolean;
  returnUrl: string;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.email = new UntypedFormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.password = new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@[-`{-~]).{8,64}$'
      )
    ]);

    this.loginForm = new UntypedFormGroup({
      email: this.email,
      password: this.password
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(loginFormValue: any) {
    this.showError = false;
    const login = { ...loginFormValue };
    const userForAuthentication: UserForAuthenticationDto = {
      email: login.email,
      password: login.password,
      clientURI: 'http://localhost:4200/authentication/account-recovery'
    };

    this.authenticationService
      .login('api/accounts/login', userForAuthentication)
      .subscribe(
        (res: any) => {
          if (res.is2StepVerificationRequired) {
            this.router.navigate(['/authentication/two-step-verification'], {
              queryParams: {
                returnUrl: this.returnUrl,
                provider: res.provider,
                email: userForAuthentication.email
              }
            });
          } else {
            localStorage.setItem('token', res.token);
            this.authenticationService.sendAuthStateChangeNotification(
              res.isAuthSuccessful
            );
            this.router.navigate([this.returnUrl]);
          }
        },
        (error) => {
          this.errorMessage = error;
          this.showError = true;
        }
      );
  };
}
