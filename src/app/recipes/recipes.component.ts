import { Component } from '@angular/core';
import { Recipe } from '../../Models/Recipe.model';
import { RecipesService } from '../../Services/recipes-service.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipesService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes(); 
  }

}
