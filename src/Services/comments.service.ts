import { Injectable } from '@angular/core';
import { Comment } from './../Models/Comment.model'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from '../Services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  server = 'http://localhost:5169/api/comment'
  
  constructor(private http: HttpClient, private authService: AuthService) { }

  getCommentsByRecipeId(recipeId: number): Observable<Comment[]> {
    var reqHeader = new HttpHeaders({
      'accept': '*/*'
    })
    return this.http.get<Comment[]>('http://localhost:5169/api/comment/by_recipe/' + recipeId, { headers: reqHeader })
  }

  postNewComment(commentText: string, recipeId: number) {
    var reqHeader = new HttpHeaders({
      'accept': '*/*',
      'Authorization': `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json'
    })
    let commentData = {
      "recipeId": recipeId,
      "commentText": commentText
    };

    // Send the POST request
    return this.http.post<any>(this.server, commentData, { headers: reqHeader })
      .pipe(
        map(() => true), // Emit true on successful post
        catchError(error => of(false)) // Emit false on error
      );
    }

}
