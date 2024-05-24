import { Component , OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../../Models/Recipe.model';
import { RecipesService } from '../../../Services/recipes.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.scss'
})
export class RecipePageComponent {
  private server = 'http://localhost:5169/api/image/';
  recipe: Recipe | undefined;
  recipeId: number = 0;
  instructionsTrimmed: string[] | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipesService, private _location: Location){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      this.recipeId = Number(params.get('id'));
      this.recipeService.getRecipeById(this.recipeId.toString()).subscribe(
        (data: Recipe) => {
          // Handle successful response
          this.recipe = data;
          if(this.recipe === undefined){
            this.router.navigate(['/']); 
          }
          else{
            this.instructionsTrimmed = this.recipe.instructions.split('\n');
            this.instructionsTrimmed = this.instructionsTrimmed.filter(ing => !(/^\s*$/.test(ing)))
          }
        },
        (error) => {
          // Handle error
          console.error('Error fetching recipe:', error);
        })
      
    });
  }

  getBack(){
    this._location.back();
  }

  normalImgOrPlaceholder(imgId: string | undefined): string {
    if (imgId != undefined) {
      return this.server + imgId;
    } else {
      return "../../../assets/imgs/recipe-img-dummy.jpg";
    }
  }

  getHoursOrMinutesFromToday(date: Date | undefined): string {
    if (date == undefined){
      return "Some time ago"
    }

    const currentDate = new Date();
    const diffMilliseconds = currentDate.getTime() - new Date(date).getTime();
    const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    }
  }
}
