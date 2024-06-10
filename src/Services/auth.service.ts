import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, BehaviorSubject, Observable } from 'rxjs';
import { IUser, IUser_Info } from "../Models/User.model"
import { environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private server = environment.apiUrl+'/api/user/';
    private route_signup = 'register';
    private route_login = 'login';
    private route_userInfo = 'info/me';
    private localStorageUser = "loggedInUser";


    private stateItem: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
    stateItem$: Observable<IUser | null> = this.stateItem.asObservable();

    constructor(private http: HttpClient) {
        const currUser = localStorage.getItem(this.localStorageUser);
        if (currUser != null) {
            this.stateItem.next(JSON.parse(currUser == null ? '' : currUser));
        }
    }
    
    Login(username: string, password: string): Observable<any> {
        var reqHeader  = new HttpHeaders({
            'accept': '*/*',
            'Content-Type': 'application/json'
          })
        let body = {
            "username": username,
            "password": password
        }
        
        return this.http.post(this.server+this.route_login, body, { headers: reqHeader }).pipe(
            map(
                (response) => {
                    const retUser = <IUser> response;
                    
                    localStorage.setItem(this.localStorageUser, JSON.stringify(retUser));

                    this.stateItem.next(retUser);
                    return retUser;
                },
            )
        );
    }

    Signup(username: string, email: string, password: string): Observable<any> {
        var reqHeader  = new HttpHeaders({
            'accept': '*/*',
            'Content-Type': 'application/json'
          })
        let body = {
            "username": username,
            "email": email, 
            "password": password,
        }
        
        return this.http.post(this.server+this.route_signup, body, { headers: reqHeader }).pipe(
            map((response) => {
                const retUser = <IUser> response;
                
                localStorage.setItem(this.localStorageUser, JSON.stringify(retUser));

                this.stateItem.next(retUser);
                return retUser;
            })
        );
    }

    getUserInfo(): Observable<any> {
        var reqHeader  = new HttpHeaders({
            'accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getToken()}`,

        })
        
        return this.http.get(this.server+this.route_userInfo, { headers: reqHeader }).pipe(
            map((response) => {
                const retUser = <IUser_Info> response;
                return retUser;
            })
        );
    }


    LogOut(){
        localStorage.clear();
        this.stateItem.next(null);
    }

    public get currentUserValue(): any {
        return this.stateItem.value;
    }
    
    isAuthenticated(): boolean {
        return !!this.currentUserValue;
    }

    public getToken(): string {
        return this.currentUserValue?.token;
    }

    public getCurrEnvUrl(): string{
        return environment.apiUrl;
    }
}