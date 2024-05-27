import { Injectable } from '@angular/core';
import { Subfooddit } from './../Models/Subfooddit.model'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { IUser } from '../Models/User.model';
import { AuthService } from './auth.service'
import { IUser_Info } from "../Models/User.model"
import { switchMap } from 'rxjs/operators';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SubfoodditService {
    private server = environment.apiUrl + '/api/subfooddit/';
    private byUserUrl = 'by_user/';
    private bySubFoodditIdUrl = 'by_subfooddit/';
    private addUserUrl = 'add_user?subfoodditId=';
    private deleteUserUrl = 'remove_user?subfoodditId=';

    constructor(private http: HttpClient, private authService: AuthService) { }
    
    getSubfooddits(): Observable<Subfooddit[]>{
        var reqHeader = new HttpHeaders({
            'accept': '*/*',
            'Authorization': `Bearer ${this.authService.getToken()}`
        })

        return this.http.get<Subfooddit[]>(`${this.server}`, { headers: reqHeader });
    }

    getUserBySubfooddits(subFoodditId: number): Observable<Subfooddit[]>{
        var reqHeader = new HttpHeaders({
            'accept': '*/*',
            'Authorization': `Bearer ${this.authService.getToken()}`
        })

        return this.http.get<Subfooddit[]>(`${this.server}${this.bySubFoodditIdUrl}${subFoodditId}`, { headers: reqHeader });
    }
 
    getSubfoodditsByUserId(): Observable<Subfooddit[]>{
        var reqHeader = new HttpHeaders({
            'accept': '*/*',
            'Authorization': `Bearer ${this.authService.getToken()}`
        })

        return this.authService.getUserInfo().pipe(
            switchMap((userInfo: IUser_Info) => {
                const id = userInfo.id.toString();
                return this.http.get<Subfooddit[]>(`${this.server}${this.byUserUrl}${id}`, { headers: reqHeader });
            })
        );
    }

    // TODO handle errors 
    leaveSubFoodit(subFoodditId: number){
        var reqHeader = new HttpHeaders({
            'accept': '*/*',
            'Authorization': `Bearer ${this.authService.getToken()}`
        })
        
        return this.http.delete(`${this.server}${this.deleteUserUrl}${subFoodditId}`, { headers: reqHeader });
    }
    
    // TODO handle errors 
    joinSubfoodit(subFoodditId: number){
        var reqHeader = new HttpHeaders({
            'accept': '*/*',
            'Authorization': `Bearer ${this.authService.getToken()}`
        })

        return this.http.post(`${this.server}${this.addUserUrl}${subFoodditId}`, '', { headers: reqHeader });
    }
}
