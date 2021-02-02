import { User } from './../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  login(user: User): Observable<any> {
    return this.http.post(AUTH_API + 'signin', user, httpOptions);
  }

  register(user: User) {
    return this.http.post(AUTH_API + 'signup', user, httpOptions);
  }


}
