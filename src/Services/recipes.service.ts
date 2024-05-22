import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Recipe } from '../Models/Recipe.model';
import { AuthService } from '../Services/auth.service'
@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private server = 'http://localhost:5169/api/recipe/';
  private subfUrl = 'by_subfooddit/'
  
  constructor(private http: HttpClient, private authService: AuthService) { }

  getRecipes(): Observable<Recipe[]>{
    var reqHeader = new HttpHeaders({
      'accept': '*/*',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
    return this.http.get<Recipe[]>(this.server, { headers: reqHeader })
  }

  getRecipeById(id: string): Observable<Recipe> {
    var reqHeader  = new HttpHeaders({
      'accept': '*/*',
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

  postNewRecipe(recipe : Recipe): void{
    var reqHeader  = new HttpHeaders({
      'accept': '*/*',
      'Authorization': `Bearer ${this.authService.getToken()}`,
    })
    const formData = new FormData();
    formData.append('Title', recipe.title);
    formData.append('SubfoodditId', recipe.subfoodditId.toString());
    if (recipe.imgId) {
      formData.append('Photo', recipe.imgId);
    }
    else{
      formData.append('Photo', '')
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
