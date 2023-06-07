import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isLoggedIn: boolean;
  currentRoute: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoggedIn = false;
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.authService.authChanged.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
    this.getCurrentRoute();
  }

  getCurrentRoute(): void {
    this.currentRoute = this.router.url;
  }

  logout(): void {
    this.authService.logout();
  }
}
