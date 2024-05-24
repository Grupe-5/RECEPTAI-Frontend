import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Recipe } from '../Models/Recipe.model';
import { AuthService } from '../Services/auth.service'
import { Vote, VoteType } from '../Models/Vote.model';
@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private server = 'http://localhost:5169/api/recipe/';
  private server_vote = 'http://localhost:5169/api/recipe_vote/'
  private subfUrl = 'by_subfooddit/'
  
  constructor(private http: HttpClient, private authService: AuthService) { }

  getRecipes(): Observable<Recipe[]>{
    var reqHeader = new HttpHeaders({
      'accept': '*/*',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
    return this.http.get<Recipe[]>(this.server + "?limit=50", { headers: reqHeader })
  }

  getRecipeById(id: string): Observable<Recipe> {
    var reqHeader  = new HttpHeaders({
      'accept': '*/*',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
    return this.http.get<Recipe>(`${this.server}${id}`, { headers: reqHeader });
  }

  getRecipesBySubfoodditId(id: string): Observable<Recipe[]>{
    var reqHeader  = new HttpHeaders({
      'accept': '*/*',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
    return this.http.get<Recipe[]>(`${this.server}${this.subfUrl}${id}`, {headers : reqHeader});
  }

  getRecipeVote(id: string): Observable<Vote> {
    var reqHeader = new HttpHeaders({
      'accept': '*/*',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
    return this.http.get<Vote>(`${this.server_vote}me/${id}`, { headers: reqHeader });
  }

  removeRecipeVote(id: string): Observable<boolean> {
    var reqHeader = new HttpHeaders({
      'accept': '*/*',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
    return this.http.delete(`${this.server_vote}${id}`, { headers: reqHeader })
      .pipe(
        map((msg) => {
          return true
        }),
        catchError(error => {
          console.error('Error: ', error);
          return of(false);
        })

      );
  }

  postRecipeVote(id: string, vote: VoteType): Observable<Vote> {
    var reqHeader = new HttpHeaders({
      'accept': '*/*',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
    var postData = {
      "recipeId": id,
      "voteType": vote
    };
    return this.http.post<Vote>(`${this.server_vote}`, postData, { headers: reqHeader })
  }

  updateRecipeVote(id: string, vote: VoteType): Observable<Vote> {
    var reqHeader = new HttpHeaders({
      'accept': '*/*',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
    var putData = {
      "voteType": vote
    };
    return this.http.put<Vote>(`${this.server_vote}${id}`, putData, { headers: reqHeader });
  }

  postNewRecipe(recipe : Recipe, imageData : File | undefined): void{
    var reqHeader  = new HttpHeaders({
      'accept': '*/*',
      'Authorization': `Bearer ${this.authService.getToken()}`,
    })
    const formData = new FormData();
    formData.append('Title', recipe.title);
    formData.append('SubfoodditId', recipe.subfoodditId.toString());
    if (imageData != null) {
      formData.append('Photo', imageData);
    }
    formData.append('Ingredients', recipe.ingredients);
    formData.append('CookingTime', recipe.cookingTime);
    formData.append('Servings', recipe.servings);
    formData.append('CookingDifficulty', recipe.cookingDifficulty.toString());
    formData.append('Instructions', recipe.instructions);

  // Send the POST request
    this.http.post(this.server, formData, { headers: reqHeader })
    .pipe(
      map((msg) => {
        return true
      }), 
      catchError(error => {
        console.error('Error: ', error);
        return of(false);
      })

    ).subscribe();

  }
}
