import { EventEmitter, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registeredUsers: { username: string, password: string, nomeUsuario: string }[] = [];
  public isLoggedIn: boolean = false;
  public authChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  private nomeUsuarioSubject: Subject<string> = new Subject<string>();

  public nomeUsuario: string = '';

  constructor(private cookieService: CookieService) {
    const usersString = this.cookieService.get('registeredUsers');
    if (usersString) {
      this.registeredUsers = JSON.parse(usersString);
    } else {
      this.registeredUsers = [];
    }
    this.isLoggedIn = this.isAuthenticated();
  }

  register(username: string, password: string, nomeUsuario: string): boolean {
    const isRegistered = this.isUserRegistered(username);

    if (isRegistered) {
      return false;
    }

    const user = { username, password, nomeUsuario };
    this.registerUser(user);

    return true;
  }

  private isUserRegistered(username: string): boolean {
    const registeredUsers = this.getRegisteredUsers();
    return registeredUsers.some(user => user.username === username);
  }

  private getRegisteredUsers(): { username: string, password: string, nomeUsuario: string }[] {
    const usersString = this.cookieService.get('registeredUsers');
    return usersString ? JSON.parse(usersString) : [];
  }

  private registerUser(user: { username: string, password: string, nomeUsuario: string }): void {
    const registeredUsers = this.getRegisteredUsers();
    registeredUsers.push(user);
    this.cookieService.set('registeredUsers', JSON.stringify(registeredUsers));
  }

  login(username: string, password: string): boolean {
    const registeredUsers = this.getRegisteredUsers();

    const user = registeredUsers.find(user => user.username === username);

    if (user && user.password === password) {
      this.cookieService.set('username', username);
      this.cookieService.set('password', password);

      this.isLoggedIn = true;
      this.nomeUsuario = user.nomeUsuario;
      this.nomeUsuarioSubject.next(this.nomeUsuario);

      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this.cookieService.delete('username');
    this.cookieService.delete('password');
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return !!this.cookieService.get('username') && !!this.cookieService.get('password');
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  getUsername(): string {
    return this.cookieService.get('username');
  }
}
