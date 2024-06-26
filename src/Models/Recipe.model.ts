import { VoteType } from './Vote.model';

export class Recipe {
  public recipeId: string;
  public userName: string;
  public userId: string;
  public title: string;
  public imgId: number;
  public subfoodditId: number;
  public subfoodditName: string;
  public ingredients: string;
  public description: string;
  public cookingTime: string;
  public servings: string;
  public datePosted: Date;
  public cookingDifficulty: number;
  public instructions: string;
  public aggregatedVotes: number;
  public vote: VoteType | undefined;
  public commentCount: number | undefined;

  constructor() {}
}
