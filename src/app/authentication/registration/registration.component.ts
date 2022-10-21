import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { matchValidator } from './../../shared/custom-validators/password-validator';
import { UserForRegistrationDto } from '../../interfaces/user/user-for-registration-dto.interface';
import { AccountActivationDialogComponent } from '../account-activation/account-activation-dialog/account-activation-dialog.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;

  hidePassword = true;
  hideConfirmPassword = true;

  errorMessage = 'Konto użytkownika o podanym adresie e-mail istnieje.';
  showError: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.firstName = new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z- ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]{1,100}$'),
    ]);
    this.lastName = new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z- ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]{1,100}$'),
    ]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@[-`{-~]).{8,64}$'
      ),
      matchValidator('confirmPassword', true),
    ]);
    this.confirmPassword = new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@[-`{-~]).{8,64}$'
      ),
      matchValidator('password'),
    ]);

    this.registrationForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
  }

  register(registrationFormValue: any) {
    const formValues = { ...registrationFormValue };

    const user: UserForRegistrationDto = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirmPassword,
      clientURI: 'http://localhost:4200/authentication/account-activation',
    };

    this.authenticationService
      .register('api/accounts/registration', user)
      .subscribe(
        (_) => {
          this.router.navigate(['/authentication/login']);
          this.openAccountActivationDialog();
        },
        (error) => {
          this.showError = true;
        }
      );
  }

  openAccountActivationDialog() {
    const dialogRef = this.dialog.open(AccountActivationDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '500px',
    });
  }
}
