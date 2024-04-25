import { Component , OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../../Models/Recipe.model';
import { RecipesService } from '../../../Services/recipes-service.service';


@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.scss'
})
export class RecipePageComponent {
  recipe: Recipe | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipesService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const recipeId = Number(params.get('id'));
      this.recipe = this.recipeService.getRecipeById(recipeId.toString())
      if(this.recipe === undefined){
        this.router.navigate(['/']); 
      }
    });
  }
}
