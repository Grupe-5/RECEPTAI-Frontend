import { Injectable } from '@angular/core';
import { Subfooddit } from './../Models/Subfooddit.model'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Recipe } from '../Models/Recipe.model';
import { AuthService } from './auth.service'
import { IUser_Info } from "../Models/User.model"
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SubfoodditService {
    private server = 'http://localhost:5169/api/subfooddit/';

    constructor(private http: HttpClient,private authService: AuthService) { }

 
    getSubbfoodditsByUserId(): Observable<Subfooddit[]>{
        var reqHeader = new HttpHeaders({
            'accept': '*/*',
            'Authorization': `Bearer ${this.authService.getToken()}`
        })

        return this.authService.getUserInfo().pipe(
            switchMap((userInfo: IUser_Info) => {
                const id = userInfo.id.toString();
                return this.http.get<Subfooddit[]>(`${this.server}${id}`, { headers: reqHeader });
            })
        );
    }

}
