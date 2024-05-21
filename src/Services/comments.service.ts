import { Injectable } from '@angular/core';
import { Comment } from './../Models/Comment.model'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Recipe } from '../Models/Recipe.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  dummyComments: Comment[] = [
    new Comment(1, "User1", `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.    `, new Date("2024-05-07"), 10, 1),
    new Comment(2, "User2", "I loved it!", new Date("2024-05-06"), 15, 2),
    new Comment(3, "User3", "Fantastic!", new Date("2024-05-05"), 5, 3),
    new Comment(4, "User4", "Delicious!", new Date("2024-05-04"), 20, 4),
    new Comment(5, "User5", "Yummy!", new Date("2024-05-03"), 12, 5),
    new Comment(6, "User6", "Tasty!", new Date("2024-05-02"), 8, 6),
    new Comment(7, "User7", "So good!", new Date("2024-05-01"), 18, 7),
    new Comment(8, "User8", "Amazing!", new Date("2024-04-30"), 25, 8),
    new Comment(9, "User9", "Incredible!", new Date("2024-04-29"), 30, 9),
    new Comment(10, "User10", "Awesome recipe!", new Date("2024-04-28"), 7, 10),
    new Comment(11, "User11", `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the`, new Date("2024-04-27"), 14, 1),
    new Comment(12, "User12", "I can't wait to try it!", new Date("2024-04-26"), 9, 2),
    new Comment(13, "User13", "So tasty!", new Date("2024-04-25"), 22, 3),
    new Comment(14, "User14", "Really good!", new Date("2024-04-24"), 17, 4),
    new Comment(15, "User15", "Impressive!", new Date("2024-04-23"), 11, 5),
    new Comment(16, "User16", "Loved it!", new Date("2024-04-22"), 28, 6),
    new Comment(17, "User17", "Perfect!", new Date("2024-04-21"), 16, 7),
    new Comment(18, "User18", "Excellent!", new Date("2024-04-20"), 19, 8),
    new Comment(19, "User19", "So delicious!", new Date("2024-04-19"), 13, 9),
    new Comment(20, "User20", "Fantastic recipe!", new Date("2024-04-18"), 23, 10),
    new Comment(21, "User21", `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been theLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the`, new Date("2024-04-17"), 26, 1),
    new Comment(22, "User22", "I'm impressed!", new Date("2024-04-16"), 31, 2),
    new Comment(23, "User23", "Wonderful recipe!", new Date("2024-04-15"), 8, 3),
    new Comment(24, "User24", "So yummy!", new Date("2024-04-14"), 16, 4),
    new Comment(25, "User25", "This is a winner!", new Date("2024-04-13"), 20, 5),
    new Comment(26, "User26", "Delightful!", new Date("2024-04-12"), 15, 6),
    new Comment(27, "User27", "Sensational!", new Date("2024-04-11"), 12, 7),
    new Comment(28, "User28", "Divine!", new Date("2024-04-10"), 18, 8),
    new Comment(29, "User29", "So tasty!", new Date("2024-04-09"), 23, 9),
    new Comment(30, "User30", "Lovely recipe!", new Date("2024-04-08"), 10, 10)
  ];
  
  constructor(private http: HttpClient) { }
  authorizationHeader = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJnaXZlbl9uYW1lIjoic2lkaGd1aWVyaGdlcnVpaCIsIm5hbWVpZCI6IjMiLCJuYmYiOjE3MTYzMTMxMjIsImV4cCI6MTcxNjkxNzkyMiwiaWF0IjoxNzE2MzEzMTIyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjgwODAifQ.aPDn_sNUQecMDJvsmlgp-gnj8rmQGC_XSIENchI52P1xduGRy-v_KxKlI6eTiKoKaztHV5h08u0jpW5AzcSaXg'

  getCommentsByRecipeId(recipeId: number): Observable<Comment[]> {
    var reqHeader = new HttpHeaders({
      'accept': '*/*'
    })
    return this.http.get<Comment[]>('http://localhost:5169/api/comment/by_recipe/' + recipeId, { headers: reqHeader })
    
  }

  postNewComment(comment : Comment){
    var reqHeader = new HttpHeaders({
      'accept': '*/*',
      'Authorization': `Bearer ${this.authorizationHeader}`,
      'Content-Type': 'application/json'
    })
    const formData = new FormData();
    formData.append('recipeId', comment.recipe_id.toString());
    formData.append('commentText', comment.text);
    ///Post body wants a date here, but seems to be a mistake, remove this later
    formData.append('commentDate', comment.date.toString())

    // Send the POST request
  //this.http.post('http://localhost:5169/api/comment', formData, { headers: reqHeader });
  return this.http.post<any>('http://localhost:5169/api/comment', formData, { headers: reqHeader })
    .pipe(
      map(() => true), // Emit true on successful post
      catchError(error => of(false)) // Emit false on error
    );
  }

}
