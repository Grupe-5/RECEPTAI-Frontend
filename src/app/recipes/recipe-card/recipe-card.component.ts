import { Component, Input } from '@angular/core';
import { Recipe } from '../../../Models/Recipe.model';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {
  @Input() recipe?: Recipe;

  constructor() {}

}