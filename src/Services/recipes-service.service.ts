import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../Models/Recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  // TODO: Replace with API endpoint
  // private apiUrl = 'https://api.example.com/recipes';  
  Recipes_Dummy_List: Recipe[] = [
    {
      recipe_id: '1',
      user_id: '1',
      title: 'Spaghetti Bolognese',
      img_id: 'spaghetti_bolognese_image.jpg',
      subreddit_id: 'cooking',
      ingredients: 'Spaghetti\nGround beef\nTomato sauce',
      description: 'Classic spaghetti bolognese recipe with a rich tomato sauce.',
      cooking_time: '30',
      servings: '4',
      date_posted: this.simulate_RandomDate(),
      cooking_difficulty: 'Medium'
    },
    {
      recipe_id: '2',
      user_id: '2',
      title: 'Chicken Stir-Fry',
      img_id: 'chicken_stir_fry_image.jpg',
      subreddit_id: 'recipes',
      ingredients: 'Chicken breast\nVegetables\nSoy sauce',
      description: 'Quick and easy chicken stir-fry with fresh vegetables.',
      cooking_time: '20',
      servings: '3',
      date_posted: this.simulate_RandomDate(),
      cooking_difficulty: 'Easy'
    },
    {
      recipe_id: '3',
      user_id: '3',
      title: 'Vegetarian Chili',
      img_id: 'vegetarian_chili_image.jpg',
      subreddit_id: 'vegetarian',
      ingredients: 'Beans\nTomatoes\nOnions\nPeppers',
      description: 'Hearty and flavorful vegetarian chili packed with beans and vegetables.',
      cooking_time: '45',
      servings: '6',
      date_posted: this.simulate_RandomDate(),
      cooking_difficulty: 'Medium'
    },
    {
      recipe_id: '4',
      user_id: '2',
      title: 'Grilled Salmon with Lemon Dill Sauce',
      img_id: 'grilled_salmon_image.jpg',
      subreddit_id: 'seafood',
      ingredients: 'Salmon fillets\nLemon\nFresh dill',
      description: 'Delicious grilled salmon served with a tangy lemon dill sauce.',
      cooking_time: '20',
      servings: '4',
      date_posted: this.simulate_RandomDate(),
      cooking_difficulty: 'Medium'
    },
    {
      recipe_id: '5',
      user_id: '1',
      title: 'Mushroom Risotto',
      img_id: 'mushroom_risotto_image.jpg',
      subreddit_id: 'italian',
      ingredients: 'Arborio rice\nMushrooms\nVegetable broth',
      description: 'Creamy and indulgent mushroom risotto cooked to perfection.',
      cooking_time: '40',
      servings: '4',
      date_posted: this.simulate_RandomDate(),
      cooking_difficulty: 'Hard'
    },
    {
      recipe_id: '6',
      user_id: '3',
      title: 'Greek Salad',
      img_id: 'greek_salad_image.jpg',
      subreddit_id: 'salads',
      ingredients: 'Cucumbers\nTomatoes\nFeta cheese\nKalamata olives',
      description: 'Refreshing Greek salad with crisp vegetables and tangy feta cheese.',
      cooking_time: '15',
      servings: '2',
      date_posted: this.simulate_RandomDate(),
      cooking_difficulty: 'Easy'
    },
    {
      recipe_id: '7',
      user_id: '2',
      title: 'Beef Tacos',
      img_id: 'beef_tacos_image.jpg',
      subreddit_id: 'mexican',
      ingredients: 'Ground beef\nTaco seasoning\nTortillas\nSalsa',
      description: 'Classic beef tacos with seasoned ground beef and all your favorite toppings.',
      cooking_time: "25",
      servings: "4",
      date_posted: this.simulate_RandomDate(),
      cooking_difficulty: 'Easy'
    },
    
  ];
  
  // TODO: Uncomment when API will be available
  // constructor(private http: HttpClient) { }
  // getRecipes(): Observable<Recipe[]> {
  //   return this.http.get<Recipe[]>(this.apiUrl);
  // }

  // getRecipeById(id: number): Observable<Recipe> {
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.get<Recipe>(url);
  // }
  getRecipes(): Recipe[]{
    return this.Recipes_Dummy_List;
  }

  getRecipeById(id: String): Recipe | undefined{
    let item1 = this.Recipes_Dummy_List.find(recipe => recipe.recipe_id === id);
    
    return item1;
  }

  simulate_RandomDate(): Date {
    const now = new Date();
    const randomInterval = Math.floor(Math.random() * 6); // Random number between 0 and 5

    switch (randomInterval) {
        case 0:
            return new Date(now.getTime() - 60000); // 1 minute ago
        case 1:
            return new Date(now.getTime() - (5 * 60000)); // 5 minutes ago
        case 2:
            return new Date(now.getTime() - (60 * 60000)); // 1 hour ago
        case 3:
            return new Date(now.getTime() - (3 * 60 * 60000)); // 3 hours ago
        case 4:
            return new Date(now.getTime() - (24 * 60 * 60000)); // 1 day ago
        case 5:
            return new Date(now.getTime() - (3 * 24 * 60 * 60000)); // 3 days ago
        default:
            return now;
    }
  }
  

}
