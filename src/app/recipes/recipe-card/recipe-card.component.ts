import { Component, Input } from '@angular/core';
import { Recipe } from '../../../Models/Recipe.model';
import { VoteType } from '../../../Models/Vote.model';
import { RecipesService } from '../../../Services/recipes.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {
  @Input() recipe?: Recipe;
  public voteType = VoteType;
  private server = 'http://localhost:5169/api/image/';

  constructor(private recipeService: RecipesService) {}

  normalImgOrPlaceholder(imgId: string | undefined): string {
    if (imgId != undefined) {
      return this.server + imgId;
    } else {
      return "../../../assets/imgs/recipe-img-dummy.jpg";
    }
  }

  getVoteCount(): string {
    const cnt = this.recipe?.aggregatedVotes;
    if (cnt) {
      if (cnt >= 1000) {
        return (cnt / 1000.0).toFixed(1);
      } else {
        return cnt.toString();
      }
    } else {
      return "0";
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

  voteTypeToNumber(vote: VoteType): number {
    if (vote == VoteType.Upvote) {
      return 1;
    } else {
      return -1;
    }
  }

  createOrUpdateVote(vote: VoteType): void {
    if (this.recipe === undefined) {
      return;
    }

    if (this.recipe.vote == undefined) {
      this.recipeService.postRecipeVote(this.recipe.recipeId.toString(), vote).subscribe(o => {
        this.recipe!.vote = o.voteType;
        this.recipe!.aggregatedVotes += this.voteTypeToNumber(o.voteType);
      });
    } else if (this.recipe.vote == vote) {
      this.recipeService.removeRecipeVote(this.recipe.recipeId.toString()).subscribe(o => {
        if (o == true && this.recipe!.vote != undefined) {
          this.recipe!.aggregatedVotes -= this.voteTypeToNumber(this.recipe!.vote);
          this.recipe!.vote = undefined;
        }
      });
    } else {
      this.recipeService.updateRecipeVote(this.recipe.recipeId.toString(), vote).subscribe(o => {
        this.recipe!.vote = o.voteType;
        this.recipe!.aggregatedVotes += this.voteTypeToNumber(this.recipe!.vote) * 2;
      });
    }
  }

  doUpvote(): void {
    this.createOrUpdateVote(VoteType.Upvote);
  }

  doDownvote(): void {
    this.createOrUpdateVote(VoteType.Downvote);
  }
}