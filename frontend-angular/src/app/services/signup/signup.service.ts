import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  signup(credentials: { email: string; password: string; phone: string; address: string; companyName: string; contactName: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/users/signup', credentials);
  }
}