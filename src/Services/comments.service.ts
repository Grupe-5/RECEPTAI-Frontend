import { Injectable } from '@angular/core';
import { Comment } from './../Models/Comment.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { Vote, VoteType } from '../Models/Vote.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private server = environment.apiUrl + '/api/comment/';
  private server_vote = environment.apiUrl + '/api/comment_vote/';
  private route_byRecipe = 'by_recipe/';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getCommentsByRecipeId(recipeId: string): Observable<Comment[]> {
    const reqHeader = new HttpHeaders({
      accept: '*/*',
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    return this.http.get<Comment[]>(
      `${this.server}${this.route_byRecipe}${recipeId}`,
      { headers: reqHeader }
    );
  }

  getCommentsById(commentId: number): Observable<Comment> {
    const reqHeader = new HttpHeaders({
      accept: '*/*',
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    return this.http.get<Comment>(`${this.server}${commentId}`, {
      headers: reqHeader,
    });
  }

  postNewComment(commentText: string, recipeId: string) {
    const reqHeader = new HttpHeaders({
      accept: '*/*',
      Authorization: `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json',
    });
    const commentData = {
      recipeId: recipeId,
      commentText: commentText,
    };

    // Send the POST request
    return this.http
      .post(this.server, commentData, { headers: reqHeader })
      .pipe(
        map(() => true), // Emit true on successful post
        catchError(() => of(false)) // Emit false on error
      );
  }

  updateComment(
    commentText: string,
    commentId: number,
    version: string
  ): Observable<Comment> {
    const reqHeader = new HttpHeaders({
      accept: '*/*',
      Authorization: `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json',
    });
    const commentData = {
      commentText: commentText,
      version: version,
    };

    return this.http.put<Comment>(this.server + commentId, commentData, {
      headers: reqHeader,
    });
  }

  getCommentVote(id: string): Observable<Vote> {
    const reqHeader = new HttpHeaders({
      accept: '*/*',
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    return this.http.get<Vote>(`${this.server_vote}me/${id}`, {
      headers: reqHeader,
    });
  }

  removeCommentVote(id: string): Observable<boolean> {
    const reqHeader = new HttpHeaders({
      accept: '*/*',
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    return this.http
      .delete(`${this.server_vote}${id}`, { headers: reqHeader })
      .pipe(
        map(() => {
          return true;
        }),
        catchError(error => {
          console.error('Error: ', error);
          return of(false);
        })
      );
  }

  postCommentVote(id: string, vote: VoteType): Observable<Vote> {
    const reqHeader = new HttpHeaders({
      accept: '*/*',
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    const postData = {
      commentId: id,
      voteType: vote,
    };
    return this.http.post<Vote>(`${this.server_vote}`, postData, {
      headers: reqHeader,
    });
  }

  updateCommentVote(id: string, vote: VoteType): Observable<Vote> {
    const reqHeader = new HttpHeaders({
      accept: '*/*',
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    const putData = {
      voteType: vote,
    };
    return this.http.put<Vote>(`${this.server_vote}${id}`, putData, {
      headers: reqHeader,
    });
  }
}
