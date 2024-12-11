import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
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
