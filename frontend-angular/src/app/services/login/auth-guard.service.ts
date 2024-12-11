import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private loginService: LoginService) {}

  canActivate(): boolean {
    if (localStorage.getItem('userInfo')) return true;

    this.loginService.logout();
    return false;
  }
}
