export class Comment {
  comment_id: number;
  user_name: string;
  text: string;
  date: Date;
  upvotes_amount: number;
  recipe_id: number;

  constructor(comment_id: number, user_name: string, comment_text: string, comment_date: Date, upvotes_amount: number, recipe_id: number) {
    this.comment_id = comment_id;
    this.user_name = user_name;
    this.text = comment_text;
    this.date = comment_date;
    this.upvotes_amount = upvotes_amount;
    this.recipe_id = recipe_id;
  }
}
