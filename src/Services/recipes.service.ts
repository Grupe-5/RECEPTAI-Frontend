import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Recipe } from '../Models/Recipe.model';
import { AuthService } from '../Services/auth.service';
import { Vote, VoteType } from '../Models/Vote.model';
import { environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private server = environment.apiUrl + '/api/recipe/';
  private server_vote = environment.apiUrl + '/api/recipe_vote/';
  private route_subf = 'by_subfooddit/';
  private route_userRecipe = 'by_user/';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getRecipes(): Observable<Recipe[]> {
    const reqHeader = new HttpHeaders({
      accept: '*/*',
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    return this.http.get<Recipe[]>(this.server + '?limit=50', {
      headers: reqHeader,
    });
  }

  getRecipeById(id: string): Observable<Recipe> {
    const reqHeader = new HttpHeaders({
      accept: '*/*',
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    return this.http.get<Recipe>(`${this.server}${id}`, { headers: reqHeader });
  }

  getRecipeByUserId(userId: number): Observable<Recipe[]> {
    const reqHeader = new HttpHeaders({
      accept: '*/*',
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.get<Recipe[]>(
      `${this.server}${this.route_userRecipe}${userId}`,
      { headers: reqHeader }
    );
  }

  getRecipesBySubfoodditId(id: number): Observable<Recipe[]> {
    const reqHeader = new HttpHeaders({
      accept: '*/*',
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    return this.http.get<Recipe[]>(
      `${this.server}${this.route_subf}${id}?limit=50`,
      { headers: reqHeader }
    );
  }

  getRecipeVote(id: string): Observable<Vote> {
    const reqHeader = new HttpHeaders({
      accept: '*/*',
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    return this.http.get<Vote>(`${this.server_vote}me/${id}`, {
      headers: reqHeader,
    });
  }

  removeRecipeVote(id: string): Observable<boolean> {
    const reqHeader = new HttpHeaders({
      accept: '*/*',
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    return this.http
      .delete(`${this.server_vote}${id}`, { headers: reqHeader })
      .pipe(
        map(() => {
          return true;
        })
      );
  }

  postRecipeVote(id: string, vote: VoteType): Observable<Vote> {
    const reqHeader = new HttpHeaders({
      accept: '*/*',
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    const postData = {
      recipeId: id,
      voteType: vote,
    };
    return this.http.post<Vote>(`${this.server_vote}`, postData, {
      headers: reqHeader,
    });
  }

  updateRecipeVote(id: string, vote: VoteType): Observable<Vote> {
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

  postNewRecipe(
    recipe: Recipe,
    imageData: File | undefined
  ): Observable<Recipe> {
    const reqHeader = new HttpHeaders({
      accept: '*/*',
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
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
    return this.http
      .post<Recipe>(this.server, formData, { headers: reqHeader })
      .pipe(
        map((recipe: Recipe) => {
          return recipe;
        })
      );
  }
}
