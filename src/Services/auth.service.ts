import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, BehaviorSubject, Observable } from 'rxjs';
import { IUser } from "../Models/User.model"
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private server = 'http://localhost:5169';
    private loginUrl = '/api/user/login';
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
        
        return this.http.post(this.server+this.loginUrl, body, { headers: reqHeader }).pipe(
            map((response) => {
                const retUser = <IUser> response;
                
                localStorage.setItem(this.localStorageUser, JSON.stringify(retUser));

                this.stateItem.next(retUser);
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
}