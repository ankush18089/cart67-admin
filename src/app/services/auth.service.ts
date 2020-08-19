import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Tokens } from './tokens';
import { SerializePipe } from '../serialize.pipe';
import { catchError, mapTo, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'access_token';
  private readonly REFRESH_TOKEN = 'refresh_token';
  private loggedUser: string;

  constructor(private http: HttpClient, private serializePipe: SerializePipe) { }

  login(user: { username: string, password: string }): Observable<boolean> {


    const body = this.serializePipe.transform({
      grant_type: 'password',
      username: user.username,
      password: user.password,
      scope: 'openid'
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic YWNtZTphY21lc2VjcmV0',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post<any>('https://dapi.shunyafoundation.com/cart67-auth/oauth/token', body, httpOptions)
      .pipe(
        tap(tokens => this.doLoginUser(user.username, tokens)),
        mapTo(true),
        catchError(error => {
          return of(false);
        }));
  }

  logout() {
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    const body = this.serializePipe.transform({
      grant_type: 'refresh_token',
      refresh_token: this.getRefreshToken(),
      scope: 'openid'
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic YWNtZTphY21lc2VjcmV0',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this.http.post<any>('https://dapi.shunyafoundation.com/cart67-auth/oauth/token',
      body, httpOptions).pipe(
        tap(tokens => this.storeJwtToken(tokens.access_token)
        ));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.access_token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh_token);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
