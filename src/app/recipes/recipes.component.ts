import { Component, Input } from '@angular/core';
import { Recipe } from '../../Models/Recipe.model';
import { RecipesService } from '../../Services/recipes.service';
import { SubfoodditService } from '../../Services/subfooddit.service'
import { Subfooddit } from '../../Models/Subfooddit.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent {
  recipes: Recipe[] = [];
  @Input() ShowTitle: Boolean = true;
  @Input() SubFoodditName: string;

  constructor(private recipeService: RecipesService, private route: ActivatedRoute, private subfoodditService: SubfoodditService, private router: Router) {}

  ngOnInit(): void {
    if(this.SubFoodditName){
      this.route.params.subscribe((params: any) =>{
        if(params){
          this.initNewSubF()
        }
      });
    }
    else{
      this.recipeService.getRecipes().subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
          this.recipes.sort((a, b)=> (a.aggregatedVotes > b.aggregatedVotes ? -1 : 1));
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
          this.recipes.sort((a, b)=> (a.aggregatedVotes > b.aggregatedVotes ? -1 : 1));
        },
        (error) => {
          console.error('Error fetching recipes: ', error);
        }
      );
      
    });
  }

  selectChange(event: any) {
    switch(event.target.value){
      case "Best": {
        this.recipes.sort((a, b)=> (a.aggregatedVotes > b.aggregatedVotes ? -1 : 1));
        
        break;
      } 
      case "Newest": {
        this.recipes.sort((a, b)=> (a.datePosted > b.datePosted ? -1 : 1));
        
        break;
      } 
    }
  }
}
