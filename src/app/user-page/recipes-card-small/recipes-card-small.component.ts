import { Component, input } from '@angular/core';
import { Recipe } from '../../../Models/Recipe.model';

@Component({
  selector: 'app-recipes-card-small',
  templateUrl: './recipes-card-small.component.html',
  styleUrl: './recipes-card-small.component.scss',
})
export class RecipesCardSmallComponent {
  recipe = input.required<Recipe>();
}
