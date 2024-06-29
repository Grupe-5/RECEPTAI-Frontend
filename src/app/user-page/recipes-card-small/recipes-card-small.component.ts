import { Component, input } from '@angular/core';
import { Recipe } from '../../../Models/Recipe.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-recipes-card-small',
  templateUrl: './recipes-card-small.component.html',
  styleUrl: './recipes-card-small.component.scss',
})
export class RecipesCardSmallComponent {
  recipe = input.required<Recipe>();

  private server = '';

  normalImgOrPlaceholder(imgId: string | undefined): string {
    this.server = environment.apiUrl + '/api/image/';

    if (imgId != undefined) {
      return this.server + imgId;
    } else {
      return '../../../assets/imgs/recipe-img-dummy.jpg';
    }
  }
}
