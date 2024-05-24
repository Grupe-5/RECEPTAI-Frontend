import { Component, Input } from '@angular/core';
import { Recipe } from '../../../Models/Recipe.model';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {
  @Input() recipe?: Recipe;
  private server = 'http://localhost:5169/api/image/';

  constructor() {}

  normalImgOrPlaceholder(imgId: string | undefined): string {
    if (imgId != undefined) {
      return this.server + imgId;
    } else {
      return "../../../assets/imgs/recipe-img-dummy.jpg";
    }
  }

  getHoursOrMinutesFromToday(date: Date | undefined): string {
    if (date == undefined)
      return "Some time ago"

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