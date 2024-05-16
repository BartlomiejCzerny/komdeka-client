import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from './../shared/services/authentication.service';
import { Router } from '@angular/router';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ThemeService } from './../shared/services/theme.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  isDarkMode: boolean;

  isUserAuthenticated: boolean;
  email: any;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar,
    private themeService: ThemeService
  ) {
      this.themeService.initTheme();
      this.isDarkMode = this.themeService.isDarkMode();

      this.authenticationService.authChanged.subscribe((res) => {
        this.isUserAuthenticated = res;
        this.email = localStorage.getItem('e-mail');
      });
  }

  ngOnInit() { }

  toggleDarkMode() {
    this.isDarkMode = this.themeService.isDarkMode();

    this.isDarkMode
      ? this.themeService.update('light-mode')
      : this.themeService.update('dark-mode');
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
    this.openLogoutSnackbar();
  }

  openLogoutSnackbar() {
    this.snackBar.open('Nastąpiło pomyślne wylogowanie.', 'OK', {
      duration: 5000
    });
  }
}
