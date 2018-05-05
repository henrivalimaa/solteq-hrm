import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  private route;
  constructor(
  	private authService: AuthService,
  	private router: Router) { }

  ngOnInit() { }

  /**
  * Logout (AuthService)
  */
  logout() {
  	this.authService.logout();
  	this.router.navigate(['/login']);
  }

}
