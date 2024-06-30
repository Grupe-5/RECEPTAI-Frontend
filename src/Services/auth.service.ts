import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, BehaviorSubject, Observable } from 'rxjs';
import { IUser, IUser_Info } from '../Models/User.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private server = environment.apiUrl + '/api/user/';
  private route_signup = 'register';
  private route_login = 'login';
  private route_userInfo = 'info/me';
  private localStorageUser = 'loggedInUser';

  private stateItem: BehaviorSubject<IUser | null> =
    new BehaviorSubject<IUser | null>(null);

  constructor(private http: HttpClient) {
    const currUser = localStorage.getItem(this.localStorageUser);
    if (currUser != null) {
      this.stateItem.next(JSON.parse(currUser == null ? '' : currUser));
    }
  }

  Login(username: string, password: string): Observable<IUser> {
    const reqHeader = new HttpHeaders({
      accept: '*/*',
      'Content-Type': 'application/json',
    });
    const body = {
      username: username,
      password: password,
    };

    return this.http
      .post(this.server + this.route_login, body, { headers: reqHeader })
      .pipe(
        map(response => {
          const retUser = <IUser>response;

          localStorage.setItem(this.localStorageUser, JSON.stringify(retUser));

          this.stateItem.next(retUser);
          return retUser;
        })
      );
  }

  Signup(username: string, email: string, password: string): Observable<IUser> {
    const reqHeader = new HttpHeaders({
      accept: '*/*',
      'Content-Type': 'application/json',
    });
    const body = {
      username: username,
      email: email,
      password: password,
    };

    return this.http
      .post(this.server + this.route_signup, body, { headers: reqHeader })
      .pipe(
        map(response => {
          const retUser = <IUser>response;

          localStorage.setItem(this.localStorageUser, JSON.stringify(retUser));

          this.stateItem.next(retUser);
          return retUser;
        })
      );
  }

  getUserInfo(): Observable<IUser_Info> {
    const reqHeader = new HttpHeaders({
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    });

    return this.http
      .get(this.server + this.route_userInfo, { headers: reqHeader })
      .pipe(
        map(response => {
          const retUser = <IUser_Info>response;
          return retUser;
        })
      );
  }

  LogOut() {
    localStorage.clear();
    this.stateItem.next(null);
  }

  public get currentUserValue(): null | IUser {
    return this.stateItem.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  public getToken(): string | undefined {
    return this.currentUserValue?.token;
  }

  public getCurrEnvUrl(): string {
    return environment.apiUrl;
  }
}
