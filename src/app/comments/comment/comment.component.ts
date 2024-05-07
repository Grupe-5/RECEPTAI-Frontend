import { Component, Input } from '@angular/core';
import { Comment } from '../../../Models/Comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() comment?: Comment;
}
