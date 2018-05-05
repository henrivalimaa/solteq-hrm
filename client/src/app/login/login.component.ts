import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { fadeInOutAnimation, snackBarAnimation } from "../animations/animations";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    fadeInOutAnimation,
    snackBarAnimation
  ]
})

export class LoginComponent implements OnInit {
  private user: any = {};
  private loading: boolean = false;
  private loginError: boolean;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  /**
  * Logout (AuthService)
  */
  ngOnInit() {
    this.authService.logout();
  }

  /**
  * Login (AuthService)
  */
  login() {
    this.loading = true;
    this.authService.login(this.user.username, this.user.password)
      .subscribe(result => {
        if (result.token) {
          this.router.navigate(['employees']);
        } else {
          this.showError();
          this.loading = false;
        }
      });
  }

  /**
  * Shows error dialog if authentication failed
  */
  showError() {
    this.loginError = true;

    setTimeout(() => {
      this.loginError = false;
    }, 7000);
  }
}
