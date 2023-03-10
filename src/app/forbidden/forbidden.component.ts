import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {
  isUserAuthenticated = false;
  isUserAdmin = false;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if (this.authenticationService.isUserAuthenticated())
      this.isUserAuthenticated = true;
    if (this.authenticationService.isUserAdmin())
      this.isUserAdmin = true;
  }
}
