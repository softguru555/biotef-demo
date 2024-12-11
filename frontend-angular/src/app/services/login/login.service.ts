import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any) {
    this.http.post<any>(this.apiUrl + '/users/login', credentials).subscribe({
      next: (response) => {
        localStorage.setItem('userInfo', response.userInfo);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/account']);
        alert('Login Success!');
      },
      error: (error) => {
        console.log('error :>> ', error);
        alert(error.error.message);
      },
    });
  }
}
