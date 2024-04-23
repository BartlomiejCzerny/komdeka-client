import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { matchValidator } from './../../shared/custom-validators/password-validator';
import { ResetPasswordDto } from '../../interfaces/reset-password/reset-password-dto.interface';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: UntypedFormGroup;
  password: UntypedFormControl;
  confirmPassword: UntypedFormControl;

  hidePassword = true;
  hideConfirmPassword = true;

  showError: boolean;
  errorMessage: string;

  private token: string;
  private email: string;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.password = new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@[-`{-~]).{8,64}$'
      ),
      matchValidator('confirmPassword', true)
    ]);
    this.confirmPassword = new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@[-`{-~]).{8,64}$'
      ),
      matchValidator('password')
    ]);

    this.resetPasswordForm = new UntypedFormGroup({
      password: this.password,
      confirmPassword: this.confirmPassword
    });

    this.token = this.route.snapshot.queryParams['token'];
    this.email = this.route.snapshot.queryParams['email'];
  }

  resetPassword(resetPasswordFormValue: any) {
    const resetPassword = { ...resetPasswordFormValue };
    const resetPasswordDto: ResetPasswordDto = {
      password: resetPassword.password,
      confirmPassword: resetPassword.confirmPassword,
      token: this.token,
      email: this.email
    };

    this.authenticationService
      .resetPassword('api/accounts/resetpassword', resetPasswordDto)
      .subscribe(
        (_) => {
          this.router.navigate(['/authentication/login']);
          this.openPasswordResetSnackbar();
        },
        (error) => {
          this.showError = true;
          this.errorMessage = error;
        }
      );
  }

  openPasswordResetSnackbar() {
    this.snackBar.open('Hasło zostało pomyślnie zresetowane.', 'OK', {
      duration: 5000
    });
  }
}
