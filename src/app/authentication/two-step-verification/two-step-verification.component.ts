import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TwoFactorDto } from './../../interfaces/two-factor/two-factor-dto.interface';

@Component({
  selector: 'app-two-step-verification',
  templateUrl: './two-step-verification.component.html',
  styleUrls: ['./two-step-verification.component.scss'],
})
export class TwoStepVerificationComponent implements OnInit {
  twoStepForm: FormGroup;
  private twoFactorCode: FormControl;

  showError: boolean;
  errorMessage: string;

  private provider: string;
  private email: string;
  private returnUrl: string;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.twoFactorCode = new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{6}')
    ]);
    this.twoStepForm = new FormGroup({
      twoFactorCode: this.twoFactorCode
    });

    this.provider = this.route.snapshot.queryParams['provider'];
    this.email = this.route.snapshot.queryParams['email'];
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  login(twoStepFormValue: any) {
    this.showError = false;
    const formValue = { ...twoStepFormValue };
    let twoFactorDto: TwoFactorDto = {
      email: this.email,
      provider: this.provider,
      token: formValue.twoFactorCode
    };

    this.authenticationService
      .twoStepLogin('api/accounts/twostepverification', twoFactorDto)
      .subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);
          this.authenticationService.sendAuthStateChangeNotification(
            res.isAuthSuccessful
          );
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.errorMessage = error;
          this.showError = true;
        }
      );
  };
}
