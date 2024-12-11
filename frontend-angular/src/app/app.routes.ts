import { Routes } from '@angular/router';
import { TemplateComponent } from './template/template.component';
export const routes: Routes = [
  // { path: '', component: HomeComponent, },
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
        loadComponent: () =>
          import('./auth/signup/signup.component').then(
            (mod) => mod.SignupComponent
          ),
      },
      {
        path: 'account',
        loadComponent: () =>
          import('./account/account.component').then(
            (mod) => mod.AccountComponent
          ),
      },
    ],
  },
];
