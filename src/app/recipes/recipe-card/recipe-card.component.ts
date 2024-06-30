import { Component, Input } from '@angular/core';
import { Recipe } from '../../../Models/Recipe.model';
import { VoteType } from '../../../Models/Vote.model';
import { RecipesService } from '../../../Services/recipes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent {
  @Input({required: true}) recipe: Recipe;
  public voteType = VoteType;

  constructor(
    private recipeService: RecipesService,
    private toastr: ToastrService,
  ) {}

  private voteTypeToNumber(vote: VoteType): number {
    if (vote == VoteType.Upvote) {
      return 1;
    } else {
      return -1;
    }
  }

  private createOrUpdateVote(vote: VoteType): void {
    if (this.recipe === undefined) {
      return;
    }

    if (this.recipe.vote == undefined) {
      this.recipeService
        .postRecipeVote(this.recipe.recipeId.toString(), vote)
        .subscribe(o => {
          this.recipe!.vote = o.voteType;
          this.recipe!.aggregatedVotes += this.voteTypeToNumber(o.voteType);
        });
    } else if (this.recipe.vote == vote) {
      this.recipeService
        .removeRecipeVote(this.recipe.recipeId.toString())
        .subscribe(o => {
          if (o == true && this.recipe!.vote != undefined) {
            this.recipe!.aggregatedVotes -= this.voteTypeToNumber(
              this.recipe!.vote
            );
            this.recipe!.vote = undefined;
          }
        });
    } else {
      this.recipeService
        .updateRecipeVote(this.recipe.recipeId.toString(), vote)
        .subscribe(o => {
          this.recipe!.vote = o.voteType;
          this.recipe!.aggregatedVotes +=
            this.voteTypeToNumber(this.recipe!.vote) * 2;
        });
    }
  }

  doUpvote(): void {
      this.createOrUpdateVote(VoteType.Upvote);
  }

  doDownvote(): void {
      this.createOrUpdateVote(VoteType.Downvote);
  }

  public copyLinkToClipBoard(recipeId: string | undefined) {
    if (recipeId) {
      const valToCopy = `${location.origin}/recipe/${recipeId}`;

      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = valToCopy;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);

      this.toastr.info('Link copied to the clipboard');
    }
  }
}
