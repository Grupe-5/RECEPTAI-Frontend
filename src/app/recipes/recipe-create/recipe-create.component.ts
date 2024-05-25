import { Component } from '@angular/core';
import { Recipe } from '../../../Models/Recipe.model';
import { SubfoodditService } from '../../../Services/subfooddit.service'
import { RecipesService } from '../../../Services/recipes.service'
import { Subfooddit } from '../../../Models/Subfooddit.model'
import { Router } from '@angular/router';

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

  constructor(private router: Router, private subfoodditService: SubfoodditService, private recipesService: RecipesService){}

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
      this.imageFile = undefined;
    }
  }
  showDropDown(): boolean{
    return this.usersSubFooddits.length > 0;
  }

  formSubmited(){
    let subFId = (this.usersSubFooddits.find((sf: Subfooddit) => sf.title == this.selectedSubFoodit))?.subfoodditId;
    this.newRecipe.subfoodditId = subFId ? subFId : 1;
    this.recipesService.postNewRecipe(this.newRecipe, this.imageFile).subscribe((newRecipe: Recipe) =>{
      this.router.navigate([`/recipe/${newRecipe.recipeId}`]);
    })
  }

  updateSubFoodit(subFoodTitle: String){
    this.selectedSubFoodit = subFoodTitle;
  }
}
