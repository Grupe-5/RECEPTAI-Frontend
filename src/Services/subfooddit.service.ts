import { Injectable, signal } from '@angular/core';
import { Subfooddit } from './../Models/Subfooddit.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { IUser_Info } from '../Models/User.model';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubfoodditService {
  private server = environment.apiUrl + '/api/subfooddit/';
  private byUserUrl = 'by_user/';
  private bySubFoodditIdUrl = 'by_subfooddit/';
  private addUserUrl = 'add_user?subfoodditId=';
  private deleteUserUrl = 'remove_user?subfoodditId=';
  public userSubFooddits = signal<Subfooddit[]>([]);

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getSubfooddits(): Observable<Subfooddit[]> {
    const reqHeader = new HttpHeaders({
      accept: '*/*',
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.get<Subfooddit[]>(`${this.server}`, {
      headers: reqHeader,
    });
  }

  getUserBySubfooddits(subFoodditId: number): Observable<Subfooddit[]> {
    const reqHeader = new HttpHeaders({
      accept: '*/*',
    });

    return this.http.get<Subfooddit[]>(
      `${this.server}${this.bySubFoodditIdUrl}${subFoodditId}`,
      { headers: reqHeader }
    );
  }

  getSubfoodditsByUserId(): Observable<Subfooddit[]> {
    const reqHeader = new HttpHeaders({
      accept: '*/*',
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.authService.getUserInfo().pipe(
      switchMap((userInfo: IUser_Info) => {
        const id = userInfo.id.toString();
        return this.http.get<Subfooddit[]>(
          `${this.server}${this.byUserUrl}${id}`,
          { headers: reqHeader }
        ).pipe(
          catchError(() => {
            this.userSubFooddits.set([]);
            return [];
          }),
          tap((subfooddits: Subfooddit[])=>{
            this.userSubFooddits.set(subfooddits);
          })
        );
      })
    );
  }

  postNewSubFoodit(newSubfooddit: Subfooddit): Observable<Subfooddit> {
    const reqHeader = new HttpHeaders({
      accept: '*/*',
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    const newSubfoodditData = {
      title: newSubfooddit.title,
      description: newSubfooddit.description,
    };

    return this.http.post<Subfooddit>(`${this.server}`, newSubfoodditData, {
      headers: reqHeader,
    });
  }

  // TODO handle errors
  leaveSubFoodit(subFoodditId: number) {
    const reqHeader = new HttpHeaders({
      accept: '*/*',
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.delete(
      `${this.server}${this.deleteUserUrl}${subFoodditId}`,
      { headers: reqHeader }
    ).pipe(tap(()=>{
      this.getSubfoodditsByUserId().subscribe();
    }));
  }

  // TODO handle errors
  joinSubfoodit(subFoodditId: number) {
    const reqHeader = new HttpHeaders({
      accept: '*/*',
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.post(
      `${this.server}${this.addUserUrl}${subFoodditId}`,
      '',
      { headers: reqHeader }
    ).pipe(tap(()=>{
      this.getSubfoodditsByUserId().subscribe();
    }));
  }
}
