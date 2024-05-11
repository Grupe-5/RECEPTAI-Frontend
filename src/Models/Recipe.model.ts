export class Recipe {
    recipe_id: string;
    user_id: string;
    title: string;
    img_id: string; 
    subreddit_id: string; 
    ingredients: string; 
    description: string;
    cooking_time: string; 
    servings: string;
    date_posted: Date;
    cooking_difficulty: string;
    instructions: string;
      
    constructor(
      recipe_id: string,
      user_id: string,
      title: string,
      img_id: string,
      subreddit_id: string,
      ingredients: string,
      description: string,
      cooking_time: string,
      servings: string,
      date_posted: Date,
      cooking_difficulty: string,
      instructions: string,
    ) {
      this.recipe_id = recipe_id;
      this.user_id = user_id;
      this.title = title;
      this.img_id = img_id;
      this.subreddit_id = subreddit_id;
      this.ingredients = ingredients;
      this.description = description;
      this.cooking_time = cooking_time;
      this.servings = servings;
      this.date_posted = date_posted;
      this.cooking_difficulty = cooking_difficulty; 
      this.instructions = instructions;
    }
  }
  