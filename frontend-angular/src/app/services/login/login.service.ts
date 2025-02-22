import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { LocalStorageService } from '../storage/local-storage.service';
import { Observable } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:5000/api';
  private currentUserSubject!: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorage: LocalStorageService,
    private toast: HotToastService
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      this.localStorage.getItem('userInfo')
        ? (this.localStorage.getItem('userInfo')! as User)
        : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
  login(credentials: any) {
    this.http.post<any>(this.apiUrl + '/users/login', credentials).subscribe({
      next: (response) => {
        this.localStorage.setItem('userInfo', response.userInfo);
        this.localStorage.setItem('authToken', response.token);
        const data: User = response.userInfo;
        this.saveCurrentUser(data);
        this.toast.info('Login Success!');
        // this.notify.showSuccess('Login Success!', 'Success ');
        this.router.navigate(['/account']);
      },
      error: (error) => {
        console.log('error :>> ', error);
        this.toast.error('email or password is not correct');
      },
    });
  }

  saveCurrentUser(data: User) {
    this.currentUserSubject.next(data);
  }
  logout() {
    this.localStorage.removeItem('authToken');
    this.localStorage.removeItem('userInfo');
    this.currentUserSubject.next(null);
    this.router.navigate(['auth/login']);
  }
}
