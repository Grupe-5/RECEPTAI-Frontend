import { Component , OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../../Models/Recipe.model';
import { RecipesService } from '../../../Services/recipes.service';
import { Location } from '@angular/common';
import { VoteType } from '../../../Models/Vote.model';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../Services/auth.service';


@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.scss'
})
export class RecipePageComponent {
  private server = environment.apiUrl + '/api/image/';
  public voteType = VoteType;
  recipe: Recipe | undefined;
  recipeId: number = 0;
  instructionsTrimmed: string[] | undefined;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private recipeService: RecipesService, 
    private _location: Location,
    private authService: AuthService, 
    private toastr: ToastrService
  ){}

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
    if(this.authService.isAuthenticated()){
        this.createOrUpdateVote(VoteType.Upvote);
    }
    else{
      this.toastr.error("You have to sign-in to vote!", "Recipe Vote Error");
    }
  }

  doDownvote(): void {
    if(this.authService.isAuthenticated()){
      this.createOrUpdateVote(VoteType.Downvote);
    }
    else{
      this.toastr.error("You have to sign-in to vote!", "Recipe Vote Error");
    }
  }
}
