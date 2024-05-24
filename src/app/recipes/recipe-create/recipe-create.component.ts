import { Component } from '@angular/core';
import { Recipe } from '../../../Models/Recipe.model';
import { SubfoodditService } from '../../../Services/subfooddit.service'
import { RecipesService } from '../../../Services/recipes.service'
import { Subfooddit } from '../../../Models/Subfooddit.model'

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrl: './recipe-create.component.scss'
})
export class RecipeCreateComponent {  
  newRecipe: Recipe = new Recipe();
  selectedSubFoodit: String = "";
  usersSubFooddits: Subfooddit[] = [];

  constructor(private subfoodditService: SubfoodditService, private recipesService: RecipesService){}
  ngOnInit(){
    this.subfoodditService.getSubfoodditsByUserId().subscribe((resp: Subfooddit[])=>{
        this.usersSubFooddits = resp;
        
        this.selectedSubFoodit = resp[0]?.title;
      }
    )
  }
  
  formSubmited(){
    // TODO: add error checking 
    let subFId = (this.usersSubFooddits.find((sf: Subfooddit) => sf.title == this.selectedSubFoodit))?.subfoodditId;
    this.newRecipe.subfoodditId = subFId ? subFId : 1; // TODO throw error 

    this.recipesService.postNewRecipe(this.newRecipe)
  }
  updateSubFoodit(subFoodTitle: String){
    this.selectedSubFoodit = subFoodTitle;
  }
}
