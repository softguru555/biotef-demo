import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const data = this.http.get<any>(this.apiUrl + '/users/getInfo', {
      headers,
    });
    console.log('data :>> ', data);
    return data;
  }
}
