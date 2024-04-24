import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { AccountRecoveryDto } from '../../interfaces/reset-password/account-recovery-dto.interface';

@Component({
  selector: 'app-account-recovery',
  templateUrl: './account-recovery.component.html',
  styleUrls: ['./account-recovery.component.scss'],
})
export class AccountRecoveryComponent implements OnInit {
  accountRecoveryForm: UntypedFormGroup;
  email: UntypedFormControl;

  errorMessage: string;
  showError: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.email = new UntypedFormControl('', [
      Validators.required,
      Validators.email
    ]);

    this.accountRecoveryForm = new UntypedFormGroup({
      email: this.email
    });
  }

  accountRecovery(accountRecoveryFormValue: any) {
    const accountRecovery = { ...accountRecoveryFormValue };
    const accountRecoveryDto: AccountRecoveryDto = {
      email: accountRecovery.email,
      clientURI: 'http://localhost:4200/authentication/reset-password'
    };

    this.authenticationService
      .accountRecovery('api/accounts/accountrecovery', accountRecoveryDto)
      .subscribe(
        (_) => {
          this.router.navigate(['/authentication/login']);
          this.openPasswordResetSnackBar();
        },
        (error) => {
          this.showError = true;
          this.errorMessage = error;
        }
      );
  }

  openPasswordResetSnackBar() {
    this.snackBar.open(
      'Link do resetowania hasła został wysłany na podany adres e-mail.',
      'OK',
      {
        duration: 5000
      }
    );
  }
}
