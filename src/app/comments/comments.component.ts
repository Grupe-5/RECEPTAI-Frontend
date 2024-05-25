import { Component, Input } from '@angular/core';
import { Comment } from '../../Models/Comment.model';
import { CommentsService } from '../../Services/comments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {
  @Input() recipeId: number = 0;

  commentForm: FormGroup;
  
  sortValue?: String ; 
  
  comments: Comment[] = [];

  constructor(private commentsService: CommentsService, private fb: FormBuilder){
    this.commentForm = this.fb.group({
      commentText: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments(): void {
    this.commentsService.getCommentsByRecipeId(this.recipeId)
      .subscribe(
        (comments: Comment[]) => {
          this.comments = comments; // Assign the actual comments array
          console.log("Comments:" + this.comments);
        },
        (error) => {
          console.error('Error fetching comments: ', error);
        }
      );
    this.comments.sort((a, b) => (a.aggregatedVotes > b.aggregatedVotes ? -1 : 1));
  }

  getCommentsCountText(): String{
    let length: number = this.comments.length
    return String(length) + ' ' + (length > 1 ? "Comments" : "Comment")
  }

  selectChange(event: any) {
    switch(event.target.value){
      case "Best": {
        this.comments.sort((a, b)=> (a.aggregatedVotes > b.aggregatedVotes ? -1 : 1));
        
        break;
      } 
      case "Newest": {
        this.comments.sort((a, b)=> (a.commentDate > b.commentDate ? -1 : 1));
        
        break;
      } 
    }
    //In my case $event come with a id value
    // this.model.myListOptions = this.listOptions[$event];
  }

  onComment() {
    if (this.commentForm.valid) {
      const { commentText } = this.commentForm.value;
      this.commentsService.postNewComment(commentText, this.recipeId).subscribe(() => {
        this.fetchComments();
      });
    }
  }
}
