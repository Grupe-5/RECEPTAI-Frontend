export class Recipe {
    public recipeId: string;
    public userId: string;
    public title: string;
    public imgId: string; 
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

    constructor(){}  
}
  