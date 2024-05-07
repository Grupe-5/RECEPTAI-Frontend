import { Injectable } from '@angular/core';
import { Comment } from './../Models/Comment.model'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../Models/Recipe.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  // TODO: replace with acctual API calls
  dummyComments: Comment[] = [
    new Comment(1, "User1", "Great recipe!", new Date("2024-05-07"), 10, 1),
    new Comment(2, "User2", "I loved it!", new Date("2024-05-06"), 15, 2),
    new Comment(3, "User3", "Fantastic!", new Date("2024-05-05"), 5, 3),
    new Comment(4, "User4", "Delicious!", new Date("2024-05-04"), 20, 4),
    new Comment(5, "User5", "Yummy!", new Date("2024-05-03"), 12, 5),
    new Comment(6, "User6", "Tasty!", new Date("2024-05-02"), 8, 6),
    new Comment(7, "User7", "So good!", new Date("2024-05-01"), 18, 7),
    new Comment(8, "User8", "Amazing!", new Date("2024-04-30"), 25, 8),
    new Comment(9, "User9", "Incredible!", new Date("2024-04-29"), 30, 9),
    new Comment(10, "User10", "Awesome recipe!", new Date("2024-04-28"), 7, 10),
    new Comment(11, "User11", "This recipe is superb!", new Date("2024-04-27"), 14, 1),
    new Comment(12, "User12", "I can't wait to try it!", new Date("2024-04-26"), 9, 2),
    new Comment(13, "User13", "So tasty!", new Date("2024-04-25"), 22, 3),
    new Comment(14, "User14", "Really good!", new Date("2024-04-24"), 17, 4),
    new Comment(15, "User15", "Impressive!", new Date("2024-04-23"), 11, 5),
    new Comment(16, "User16", "Loved it!", new Date("2024-04-22"), 28, 6),
    new Comment(17, "User17", "Perfect!", new Date("2024-04-21"), 16, 7),
    new Comment(18, "User18", "Excellent!", new Date("2024-04-20"), 19, 8),
    new Comment(19, "User19", "So delicious!", new Date("2024-04-19"), 13, 9),
    new Comment(20, "User20", "Fantastic recipe!", new Date("2024-04-18"), 23, 10),
    new Comment(21, "User21", "Absolutely delicious!", new Date("2024-04-17"), 26, 1),
    new Comment(22, "User22", "I'm impressed!", new Date("2024-04-16"), 31, 2),
    new Comment(23, "User23", "Wonderful recipe!", new Date("2024-04-15"), 8, 3),
    new Comment(24, "User24", "So yummy!", new Date("2024-04-14"), 16, 4),
    new Comment(25, "User25", "This is a winner!", new Date("2024-04-13"), 20, 5),
    new Comment(26, "User26", "Delightful!", new Date("2024-04-12"), 15, 6),
    new Comment(27, "User27", "Sensational!", new Date("2024-04-11"), 12, 7),
    new Comment(28, "User28", "Divine!", new Date("2024-04-10"), 18, 8),
    new Comment(29, "User29", "So tasty!", new Date("2024-04-09"), 23, 9),
    new Comment(30, "User30", "Lovely recipe!", new Date("2024-04-08"), 10, 10)
  ];
  

  getCommentsByRecipeId(recipeId: number): Comment[] {
    const commentsByRecipeId = this.dummyComments.filter(comment => comment.recipe_id === recipeId);
    return commentsByRecipeId;
  }

}
