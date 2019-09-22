import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyCWSfwbwFjTkLwsxfqHoDQA2o4jlNo8BUc';

  userToken: string;
  userEmail: string;

  constructor(private http:HttpClient) {
    this.getToken();
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('expires');
  }

  logIn(user:UserModel) {
    const authData = {
      ...user,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe(
      map(response => {
        this.saveToken(response['idToken'], response['email']);
        return response;
      })
    );
  }

  register(user:UserModel) {
    const authData = {
      ...user,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signUp?key=${this.apiKey}`,
      authData
    ).pipe(
      map(response => {
        this.saveToken(response['idToken'], response['email']);
        return response;
      })
    );
  }

  private saveToken(idToken:string, email:string) {
    this.userToken = idToken;
    this.userEmail = email;
    localStorage.setItem('token', idToken);
    localStorage.setItem('email', email);

    let today = new Date();
    today.setSeconds(3600);

    localStorage.setItem('expires', today.getTime().toString());
  }

  getToken() {
    this.userToken = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    return this.userToken;
  }

  isAuthenticated() : boolean {
    if (this.userToken.length < 2) {
      return false;
    }

    const expires = Number(localStorage.getItem('expires'));
    let expirationDate = new Date();
    expirationDate.setTime(expires);

    if (expirationDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }
}
