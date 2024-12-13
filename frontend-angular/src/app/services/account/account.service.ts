import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getUserInfo(filter: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    let params = new HttpParams();
    Object.keys(filter).forEach((key) => {
      params = params.set(key, filter[key]);
    });

    console.log('params :>> ', params);
    const data = this.http.get<any>(this.apiUrl + '/users/getInfo', {
      headers,
      params,
    });
    console.log('data :>> ', data);
    return data;
  }
}
