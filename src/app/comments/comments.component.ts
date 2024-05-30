import { Component, Input } from '@angular/core';
import { Comment } from '../../Models/Comment.model';
import { CommentsService } from '../../Services/comments.service';
import { AuthService } from '../../Services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private commentsService: CommentsService, 
    private fb: FormBuilder, 
    private toastr: ToastrService,
    private authService: AuthService
  ){
    this.commentForm = this.fb.group({
      commentText: [''],
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
    if(!this.authService.isAuthenticated()){
      this.toastr.error("You have to sign-in to write comments!", "Comment Error");
      return;
    }

    const { commentText }  = this.commentForm.value;
    if(!commentText){
      this.toastr.error("Please fill the comment text", "Comment Error");
    }
    else{
      this.commentsService.postNewComment(commentText, this.recipeId).subscribe(
        (resp) => {
          this.fetchComments();
          this.toastr.success("Comment created successfully", "Comment action");
        },
        error =>{
          this.toastr.error("Unable to post new comment, try again.", "Comment Error");
        });
    }
  }
}
