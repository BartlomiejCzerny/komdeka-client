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

  ngOnInit() {
    if (this.authenticationService.isUserAuthenticated()) {
      this.authenticationService.sendAuthStateChangeNotification(true);
    }
  }
}
