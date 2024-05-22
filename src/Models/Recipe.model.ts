export class Recipe {
    public recipe_id: string;
    public user_id: string;
    public title: string;
    public img_id: string; 
    public subfoodit_id: number; 
    public ingredients: string; 
    public description: string;
    public cooking_time: string; 
    public servings: string;
    public date_posted: Date;
    public cooking_difficulty: number;
    public instructions: string;

    constructor(){}  
}
  