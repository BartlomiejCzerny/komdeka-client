import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.scss'],
})
export class AccountActivationComponent implements OnInit {
  public showSuccess: boolean;
  public showError: boolean;
  public errorMessage: string;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activateAccount();
  }

  private activateAccount() {
    this.showError = this.showSuccess = false;

    const token = this.route.snapshot.queryParams['token'];
    const email = this.route.snapshot.queryParams['email'];

    this.authenticationService
      .activateAccount('api/accounts/accountactivation', token, email)
      .subscribe(
        (_) => {
          this.showSuccess = true;
        },
        (error) => {
          this.showError = true;
          this.errorMessage = error;
        }
      );
  }

  redirectToLogin() {
    this.router.navigate(['/authentication/login']);
  }
}
