import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<any> {
    const data = this.http.get<any>(this.apiUrl + '/users/getInfo');
    console.log('data :>> ', data);
    return data;
  }
}
