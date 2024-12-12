import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from './login.service';
import { LocalStorageService } from '../storage/local-storage.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private loginService: LoginService,
    private localStorage: LocalStorageService
  ) {}

  canActivate(): boolean {
    if (this.localStorage.getItem('userInfo')) return true;

    this.loginService.logout();
    return false;
  }
}
