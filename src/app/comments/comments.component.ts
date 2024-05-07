import { Component, Input } from '@angular/core';
import { Comment } from '../../Models/Comment.model';
import { CommentsService } from '../../Services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {
  @Input() recipeId: number = 0;

  comments: Comment[] = [];

  constructor(private commentsService: CommentsService){
  }

  ngOnInit(): void {
    this.comments = this.commentsService.getCommentsByRecipeId(this.recipeId); 
  }

}
