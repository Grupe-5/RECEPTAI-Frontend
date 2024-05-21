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
  
  sortValue?: String ; 
  
  comments: Comment[] = [];

  constructor(private commentsService: CommentsService){
  }

  ngOnInit(): void {
    this.commentsService.getCommentsByRecipeId(this.recipeId)
  .subscribe(
    (comments: Comment[]) => {
      this.comments = comments; // Assign the actual comments array
      console.log(this.comments);
    },
    (error) => {
      console.error('Error fetching comments: ', error);
    }
  );
    this.comments.sort((a, b)=> (a.upvotes_amount > b.upvotes_amount ? -1 : 1));
  }

  getCommentsCountText(): String{
    let length: number = this.comments.length
    return String(length) + ' ' + (length > 1 ? "Comments" : "Comment")
  }

  selectChange(event: any) {
    switch(event.target.value){
      case "Best": {
        this.comments.sort((a, b)=> (a.upvotes_amount > b.upvotes_amount ? -1 : 1));
        
        break;
      } 
      case "Newest": {
        this.comments.sort((a, b)=> (a.date > b.date ? -1 : 1));
        
        break;
      } 
    }
    //In my case $event come with a id value
    // this.model.myListOptions = this.listOptions[$event];
  }


}
