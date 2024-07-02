import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { Comment } from '../../Models/Comment.model';
import { CommentsService } from '../../Services/comments.service';
import { AuthService } from '../../Services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnInit {
  @Input({required: true}) recipeId: number = 0;
  commentForm: FormGroup;
  currSortType: 'Best' | 'Newest' = 'Best';
  private comments = signal<Comment[]>([]);
  commentsSorted = computed<Comment[]>(() => {
    this.sortComments();
    return this.comments();
  });

  constructor(
    private commentsService: CommentsService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.commentForm = this.fb.group({
      commentText: [''],
    });
  }

  ngOnInit(): void {
    this.fetchComments();
  }

  private fetchComments(): void {
    this.commentsService.getCommentsByRecipeId(this.recipeId).subscribe({
      next: (comments: Comment[]) => {
        this.comments.set(comments);
      },
      error: (error) => {
        console.error('Error fetching comments: ', error);
        this.comments.set([]);
      },
    }
    );
  }

  public getCommentsCountText(): string {
    const length: number = this.comments.length;
    return String(length) + ' ' + (length > 1 ? 'Comments' : 'Comment');
  }

  public selectChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.sortComments(target.value);
  }

  public sortComments(sortType?: string){
    switch (sortType ? sortType : this.currSortType) {
      case 'Best': {
        this.currSortType = 'Best';
        this.comments().sort((a, b) =>
          a.aggregatedVotes > b.aggregatedVotes ? -1 : 1
        );

        break;
      }
      case 'Newest': {
        this.currSortType = 'Newest';
        this.comments().sort((a, b) => (a.commentDate > b.commentDate ? -1 : 1));
        break;
      }
    }
  }

  public onComment() {
    if (!this.authService.isAuthenticated()) {
      this.toastr.error(
        'You have to sign-in to write comments!',
        'Comment Error'
      );
      return;
    }

    const { commentText } = this.commentForm.value;
    if (!commentText) {
      this.toastr.error('Fill the comment text', 'Comment Error');
    } else {
      this.commentsService.postNewComment(commentText, this.recipeId).subscribe({
        next: () => {
          this.fetchComments();
          this.commentForm.reset();
          this.toastr.success('Comment created', 'Comment action');
        },
        error: () => {
          this.commentForm.reset();
          this.toastr.error(
            'Unable to post new comment, try again.',
            'Comment Error'
          );
        },
      }
      );
    }
  }
}
