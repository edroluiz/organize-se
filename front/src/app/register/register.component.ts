import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  nomeUsuario: string = '';
  registrationFailed: boolean = false;
  registrationFailedConfirmPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  register(): void {
    if (this.password !== this.confirmPassword) {
      this.registrationFailedConfirmPassword = true;
      return;
    }

    const registered = this.authService.register(this.username, this.password, this.nomeUsuario);
    if (registered) {
      this.cookieService.set('username', this.username);
      this.cookieService.set('password', this.password);
      this.router.navigate(['/login']);
    } else {
      this.registrationFailed = true;
    }
  }
}
