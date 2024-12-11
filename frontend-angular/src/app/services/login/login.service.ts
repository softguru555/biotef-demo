import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models/User';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:5000/api';
  private currentUserSubject!: BehaviorSubject<User | null>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      localStorage.getItem('userInfo')
        ? ({ name: localStorage.getItem('userInfo')! } as User)
        : null
    );
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
  login(credentials: any) {
    this.http.post<any>(this.apiUrl + '/users/login', credentials).subscribe({
      next: (response) => {
        localStorage.setItem('userInfo', response.userInfo);
        localStorage.setItem('authToken', response.token);
        const data: User = response.userInfo;
        this.saveCurrentUser(data);
        this.router.navigate(['/account']);
        alert('Login Success!');
      },
      error: (error) => {
        console.log('error :>> ', error);
        alert(error.error.message);
      },
    });
  }

  saveCurrentUser(data: User) {
    this.currentUserSubject.next(data);
  }
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    this.router.navigate(['auth/login']);
  }
}
