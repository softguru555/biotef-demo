import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
     const data =  this.http.post<any>(this.apiUrl+'/users/login', credentials);
     console.log('data :>> ', data);
     return data

  }
}