import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../Models/Recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  authorizationHeader = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXI3ODZAZXhhbXBsZS5jb20iLCJnaXZlbl9uYW1lIjoieHh4eHgiLCJuYW1laWQiOiIxIiwibmJmIjoxNzE1NjUwMjI0LCJleHAiOjE3MTYyNTUwMjQsImlhdCI6MTcxNTY1MDIyNCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwIn0.YQJxU_K2rqIPG4w3NzwIu-QElgUwW1JIYr7Lta6DNLIJmIn8SVx3uOXXs72OosL12t04ddFIsOnjjPPATa6Kug'
  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]>{
    var reqHeader = new HttpHeaders({
      'accept': '*/*',
      'Authorization': `Bearer ${this.authorizationHeader}`
    })
    return this.http.get<Recipe[]>('http://localhost:5169/api/recipe', { headers: reqHeader })
  }

  getRecipeById(id: string): Observable<Recipe> {
    var reqHeader  = new HttpHeaders({
      'accept': '*/*',
      'Authorization': `Bearer ${this.authorizationHeader}`
    })
    return this.http.get<Recipe>(`http://localhost:5169/api/recipe/${id}`, { headers: reqHeader });
  }

  getRecipesBySubfoodditId(id: string): Observable<Recipe[]>{
    var reqHeader  = new HttpHeaders({
      'accept': '*/*',
      'Authorization': `Bearer ${this.authorizationHeader}`
    })
    return this.http.get<Recipe[]>('http://localhost:5169/api/recipe/by_subfooddit/' + id, {headers : reqHeader});
  }

  postNewRecipe(recipe : Recipe): void{
    var reqHeader  = new HttpHeaders({
      'accept': '*/*',
      'Authorization': `Bearer ${this.authorizationHeader}`,
      'Content-Type': 'multipart/form-data'
    })
  const formData = new FormData();
  formData.append('Title', recipe.title);
  formData.append('SubfoodditId', recipe.subreddit_id.toString());
  if (recipe.img_id) {
    formData.append('Photo', recipe.img_id);
  }
  else{
    formData.append('Photo', '')
  }
  formData.append('Ingredients', recipe.ingredients);
  formData.append('CookingTime', recipe.cooking_time);
  formData.append('Servings', recipe.servings.toString());
  formData.append('CookingDifficulty', recipe.cooking_difficulty.toString());
  formData.append('Instructions', recipe.instructions);

  // Send the POST request
  this.http.post('http://localhost:5169/api/recipe', formData, { headers: reqHeader });

  }

  

}
