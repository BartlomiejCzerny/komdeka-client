import { AuthenticationService } from './shared/services/authentication.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Komdeka';

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    if (this.authenticationService.isUserAuthenticated()) {
      this.authenticationService.sendAuthStateChangeNotification(true);
      this.authenticationService.getEmail();
    }
  }
}
