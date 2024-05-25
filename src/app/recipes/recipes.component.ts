import { Component, Input } from '@angular/core';
import { Recipe } from '../../Models/Recipe.model';
import { RecipesService } from '../../Services/recipes.service';
import { SubfoodditService } from '../../Services/subfooddit.service'
import { Subfooddit } from '../../Models/Subfooddit.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent {
  recipes: Recipe[] = [];
  @Input() ShowTitle: Boolean = true;
  @Input() SubFoodditName: string;

  constructor(private recipeService: RecipesService, private subfoodditService: SubfoodditService, private router: Router) {
    router.events.subscribe((val) => {
      this.initNewSubF();
    });
  }


  ngOnInit(): void {
    console.log(this.SubFoodditName)
    if(this.SubFoodditName){
      this.initNewSubF();
    }
    else{
      this.recipeService.getRecipes().subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        },
        (error) => {
          console.error('Error fetching recipes: ', error);
        }
      );
    }
  }

  initNewSubF(){
    this.subfoodditService.getSubfooddits().subscribe((resp: Subfooddit[]) => {
      let subFooditId = resp.find((sf: Subfooddit) => sf.title.toLowerCase() === this.SubFoodditName.toLowerCase())?.subfoodditId;
      this.recipeService.getRecipesBySubfoodditId(subFooditId ? subFooditId : 0).subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        },
        (error) => {
          console.error('Error fetching recipes: ', error);
        }
      );
      
    });
  }
}
