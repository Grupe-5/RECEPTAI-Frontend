import { Component } from '@angular/core';
import { Recipe } from '../../../Models/Recipe.model';
import { SubfoodditService } from '../../../Services/subfooddit.service'
import { RecipesService } from '../../../Services/recipes.service'

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrl: './recipe-create.component.scss'
})
export class RecipeCreateComponent {  
  newRecipe: Recipe = new Recipe();

  constructor(private subfoodditService: SubfoodditService, private recipesService: RecipesService){}

  formSubmited(){
    // TODO: add error checking 
    this.newRecipe.subfoodditId = 1;
    this.recipesService.postNewRecipe(this.newRecipe)
  }
}
