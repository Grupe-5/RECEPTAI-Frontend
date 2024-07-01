import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../../Models/Recipe.model';
import { RecipesService } from '../../../Services/recipes.service';
import { Location } from '@angular/common';
import { VoteType } from '../../../Models/Vote.model';
   
@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.scss',
})
export class RecipePageComponent implements OnInit {
  public voteType = VoteType;
  recipe: Recipe;
  recipeId: number = 0;
  instructionsTrimmed: string[] | undefined;
  isPageLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipesService,
    private _location: Location,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.recipeId = Number(params.get('id'));
      this.recipeService.getRecipeById(this.recipeId.toString()).subscribe(
        (data: Recipe) => {
          // Handle successful response
          this.recipe = data;
          if (this.recipe === undefined) {
            this.router.navigate(['/']);
          } else {
            this.instructionsTrimmed = this.recipe.instructions.split('\n');
            this.instructionsTrimmed = this.instructionsTrimmed.filter(
              ing => !/^\s*$/.test(ing)
            );
            this.isPageLoaded = true;
          }
        },
        error => {
          // Handle error
          console.error('Error fetching recipe:', error);
          this.isPageLoaded = true;
        }
      );
    });
  }

  public getBack() {
    this._location.back();
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
      this.recipeService
        .postRecipeVote(this.recipe.recipeId.toString(), vote)
        .subscribe(o => {
          this.recipe.vote = o.voteType;
          this.recipe.aggregatedVotes += this.voteTypeToNumber(o.voteType);
        });
    } else if (this.recipe.vote == vote) {
      this.recipeService
        .removeRecipeVote(this.recipe.recipeId.toString())
        .subscribe(o => {
          if (o == true && this.recipe.vote != undefined) {
            this.recipe.aggregatedVotes -= this.voteTypeToNumber(
              this.recipe.vote
            );
            this.recipe.vote = undefined;
          }
        });
    } else {
      this.recipeService
        .updateRecipeVote(this.recipe.recipeId.toString(), vote)
        .subscribe(o => {
          this.recipe.vote = o.voteType;
          this.recipe.aggregatedVotes +=
            this.voteTypeToNumber(this.recipe.vote) * 2;
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
