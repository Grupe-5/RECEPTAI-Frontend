import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Recipe } from '../Models/Recipe.model';
import { AuthService } from '../Services/auth.service'
@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getRecipes(): Observable<Recipe[]>{
    var reqHeader = new HttpHeaders({
      'accept': '*/*',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
    return this.http.get<Recipe[]>('http://localhost:5169/api/recipe', { headers: reqHeader })
  }

  getRecipeById(id: string): Observable<Recipe> {
    var reqHeader  = new HttpHeaders({
      'accept': '*/*',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
    return this.http.get<Recipe>(`http://localhost:5169/api/recipe/${id}`, { headers: reqHeader });
  }

  getRecipesBySubfoodditId(id: string): Observable<Recipe[]>{
    var reqHeader  = new HttpHeaders({
      'accept': '*/*',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
    return this.http.get<Recipe[]>('http://localhost:5169/api/recipe/by_subfooddit/' + id, {headers : reqHeader});
  }

  postNewRecipe(recipe : Recipe): void{
    var reqHeader  = new HttpHeaders({
      'accept': '*/*',
      'Authorization': `Bearer ${this.authService.getToken()}`,
    })
    const formData = new FormData();
    formData.append('Title', recipe.title);
    formData.append('SubfoodditId', recipe.subfoodit_id.toString());
    if (recipe.img_id) {
      formData.append('Photo', recipe.img_id);
    }
    else{
      formData.append('Photo', '')
    }
    formData.append('Ingredients', recipe.ingredients);
    formData.append('CookingTime', recipe.cooking_time);
    formData.append('Servings', recipe.servings);
    formData.append('CookingDifficulty', recipe.cooking_difficulty.toString());
    formData.append('Instructions', recipe.instructions);

  // Send the POST request
    this.http.post('http://localhost:5169/api/recipe', formData, { headers: reqHeader })
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
