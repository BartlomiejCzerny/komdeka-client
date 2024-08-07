import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { TwoFactorDto } from './../../interfaces/two-factor/two-factor-dto.interface';

@Component({
  selector: 'app-two-step-verification',
  templateUrl: './two-step-verification.component.html',
  styleUrls: ['./two-step-verification.component.scss'],
})
export class TwoStepVerificationComponent implements OnInit {
  twoStepVerificationForm: UntypedFormGroup;
  private twoFactorCode: UntypedFormControl;

  showError: boolean;
  errorMessage: string;

  private provider: string;
  private email: string;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.twoFactorCode = new UntypedFormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{6}')
    ]);
    this.twoStepVerificationForm = new UntypedFormGroup({
      twoFactorCode: this.twoFactorCode
    });

    this.provider = this.route.snapshot.queryParams['provider'];
    this.email = this.route.snapshot.queryParams['email'];
  }

  login(twoStepVerificationFormValue: any) {
    this.showError = false;
    const formValue = { ...twoStepVerificationFormValue };
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
          this.router.navigate(['/orders/orders-list']);
        },
        (error) => {
          this.errorMessage = error;
          this.showError = true;
        }
      );
  };
}
