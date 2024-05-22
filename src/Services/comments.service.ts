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

  postNewComment(comment : Comment){
    var reqHeader = new HttpHeaders({
      'accept': '*/*',
      'Authorization': `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json'
    })
    const formData = new FormData();
    formData.append('recipeId', comment.recipe_id.toString());
    formData.append('commentText', comment.text);
    ///Post body wants a date here, but seems to be a mistake, remove this later
    formData.append('commentDate', comment.date.toString())

    // Send the POST request
    return this.http.post<any>(this.server, formData, { headers: reqHeader })
      .pipe(
        map(() => true), // Emit true on successful post
        catchError(error => of(false)) // Emit false on error
      );
    }

}
