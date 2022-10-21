import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from '../registration/registration.component';
import { LoginComponent } from '../login/login.component';
import { AccountActivationComponent } from '../account-activation/account-activation.component';
import { AccountRecoveryComponent } from '../account-recovery/account-recovery.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { TwoStepVerificationComponent } from '../two-step-verification/two-step-verification.component';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account-activation', component: AccountActivationComponent },
  { path: 'account-recovery', component: AccountRecoveryComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'two-step-verification', component: TwoStepVerificationComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthenticationRoutingModule {}
