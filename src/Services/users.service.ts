import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, BehaviorSubject, Observable } from 'rxjs';
import { IUser, IUser_Info } from "../Models/User.model"
import { environment } from '../environments/environment';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    private server = environment.apiUrl+'/api/user/';
    private route_userInfo = 'info/';
    private route_deleteUserAcc = 'delete_account'
    private route_userImg = 'img'
 

    constructor(private http: HttpClient, private authService: AuthService) {}    

    getUserInfo(userId: number): Observable<any> {
        var reqHeader  = new HttpHeaders({
            'accept': '*/*',
            'Content-Type': 'application/json',
        })
        
        return this.http.get(this.server+this.route_userInfo+userId, { headers: reqHeader }).pipe(
            map((response) => {
                const retUser = <IUser_Info> response;
                return retUser;
            })
        );
    }

    deleteUserAccount(){
        var reqHeader = new HttpHeaders({
            'accept': '*/*',
            'Authorization': `Bearer ${this.authService.getToken()}`
        })
        
        return this.http.delete(`${this.server}${this.route_deleteUserAcc}`, { headers: reqHeader });
    }

    updateUserImg(imageFile: File | undefined){
        var reqHeader  = new HttpHeaders({
            'accept': '*/*',
            'Authorization': `Bearer ${this.authService.getToken()}`,
        })
        const formData = new FormData();
        if (imageFile != null) {
            formData.append('file', imageFile);
        }
    
        return this.http.post(this.server+this.route_userImg, formData, { headers: reqHeader })
            .pipe(
                map((resp) => {
                return resp;
                })
            )    
    }


}