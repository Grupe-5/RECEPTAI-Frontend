import { Component } from '@angular/core';
import { Recipe } from '../../../Models/Recipe.model';
import { SubfoodditService } from '../../../Services/subfooddit.service'
import { RecipesService } from '../../../Services/recipes.service'
import { Subfooddit } from '../../../Models/Subfooddit.model'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrl: './recipe-create.component.scss'
})
export class RecipeCreateComponent {  
  newRecipe: Recipe = new Recipe();
  imageFile: File | undefined = undefined;
  selectedSubFoodit: String = "";
  usersSubFooddits: Subfooddit[] = [];

  constructor(
    private router: Router, 
    private subfoodditService: SubfoodditService, 
    private recipesService: RecipesService, 
    private toastr: ToastrService
  ){}

  ngOnInit(){
    this.subfoodditService.getSubfoodditsByUserId().subscribe(
      (resp: Subfooddit[])=>{
        this.usersSubFooddits = resp;
        this.selectedSubFoodit = resp[0].title;
      },
      (err) =>{
        console.log(err)
      }
    )
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
    } else {
      this.toastr.error("Invalid file, try again.", "Recipe creation Error");
      this.imageFile = undefined;
    }
  }
  showDropDown(): boolean{
    return this.usersSubFooddits.length > 0;
  }

  formSubmited() {
    let subFId = (this.usersSubFooddits.find((sf: Subfooddit) => sf.title === this.selectedSubFoodit))?.subfoodditId;
    this.newRecipe.subfoodditId = subFId ? subFId : 1;
  
    let errorMessage: string | null = null;
  
    switch (true) {
      case !this.newRecipe.title:
        errorMessage = "Please provide title!";
        break;
      case !this.newRecipe.cookingTime:
        errorMessage = "Please provide cooking time!";
        break;
      case !this.newRecipe.servings:
        errorMessage = "Please provide amount of servings!";
        break;
      case !this.newRecipe.cookingDifficulty:
        errorMessage = "Please provide difficulty!";
        break;
      case !this.newRecipe.ingredients:
        errorMessage = "Please provide ingredients!";
        break;
      case !this.newRecipe.instructions:
        errorMessage = "Please provide instructions!";
        break;
    }
  
    if (errorMessage) {
      this.toastr.error(errorMessage, "Recipe creation Error");
    } else {
      this.recipesService.postNewRecipe(this.newRecipe, this.imageFile).subscribe(
        (newRecipe: Recipe) => {
          this.router.navigate([`/recipe/${newRecipe.recipeId}`]);
          this.toastr.success("Recipe created successfully!", "Recipe creation");
        },
        error => {
          this.toastr.error(error.error, "Recipe creation Error");
        }
      );
    }
  }
  

  updateSubFoodit(subFoodTitle: String){
    this.selectedSubFoodit = subFoodTitle;
  }
}
