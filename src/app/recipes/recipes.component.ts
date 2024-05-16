import { Component, Input } from '@angular/core';
import { Recipe } from '../../Models/Recipe.model';
import { RecipesService } from '../../Services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent {
  recipes: Recipe[] = [];
  @Input() ShowTitle: Boolean = true;
  @Input() FoodditName: String = "";

  constructor(private recipeService: RecipesService) { }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
        console.log(this.recipes)
      },
      (error) => {
        console.error('Error fetching recipes: ', error);
      }
    );
  }

}
