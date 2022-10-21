import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';
import { AuthenticationRoutingModule } from './authentication-routing/authentication-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AccountActivationComponent } from './account-activation/account-activation.component';
import { AccountRecoveryComponent } from './account-recovery/account-recovery.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TwoStepVerificationComponent } from './two-step-verification/two-step-verification.component';

@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent,
    AccountActivationComponent,
    AccountRecoveryComponent,
    ResetPasswordComponent,
    TwoStepVerificationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthenticationRoutingModule
  ],
  providers: []
})
export class AuthenticationModule {}
