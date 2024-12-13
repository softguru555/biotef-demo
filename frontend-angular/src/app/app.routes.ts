import { Routes } from '@angular/router';
import { TemplateComponent } from './template/template.component';
import { AuthGuardService } from './services/login/auth-guard.service';
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: TemplateComponent,
    children: [
      {
        path: 'auth/login',
        loadComponent: () =>
          import('./auth/login/login.component').then(
            (mod) => mod.LoginComponent
          ),
      },
      {
        path: 'auth/signup',
        canActivate: [AuthGuardService],
        loadComponent: () =>
          import('./auth/signup/signup.component').then(
            (mod) => mod.SignupComponent
          ),
      },
      {
        path: 'account',
        canActivate: [AuthGuardService],
        loadComponent: () =>
          import('./account/account.component').then(
            (mod) => mod.AccountComponent
          ),
      },
    ],
  },
];
