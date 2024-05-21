import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Recipe } from '../Models/Recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  authorizationHeader = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJnaXZlbl9uYW1lIjoic2lkaGd1aWVyaGdlcnVpaCIsIm5hbWVpZCI6IjMiLCJuYmYiOjE3MTYzMTMxMjIsImV4cCI6MTcxNjkxNzkyMiwiaWF0IjoxNzE2MzEzMTIyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjgwODAifQ.aPDn_sNUQecMDJvsmlgp-gnj8rmQGC_XSIENchI52P1xduGRy-v_KxKlI6eTiKoKaztHV5h08u0jpW5AzcSaXg'
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
  this.http.post('http://localhost:5169/api/recipe', formData, { headers: reqHeader })
  .pipe(
    map(() => true), // Emit true on successful post
    catchError(error => of(false)) // Emit false on error
  );

  }

  

}
