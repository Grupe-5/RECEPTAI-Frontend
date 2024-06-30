import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../../Models/Comment.model';
import { VoteType } from '../../../Models/Vote.model';
import { CommentsService } from '../../../Services/comments.service';
import { IUser_Info } from '../../../Models/User.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent implements OnInit {
  @Input({required: true}) comment: Comment;
  public voteType = VoteType;
  public userId: number = 0;
  public isInEditingMode: boolean = false;
  public editComText: string;
  show: boolean;

  constructor(
    private commentsService: CommentsService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authService.getUserInfo().subscribe((resp: IUser_Info) => {
        this.userId = resp.id;
      });
    }
  }

  voteTypeToNumber(vote: VoteType): number {
    if (vote == VoteType.Upvote) {
      return 1;
    } else {
      return -1;
    }
  }

  private createOrUpdateVote(vote: VoteType): void {
    if (this.comment.vote == undefined) {
      this.commentsService
        .postCommentVote(this.comment.commentId.toString(), vote)
        .subscribe(o => {
          this.comment.vote = o.voteType;
          this.comment.aggregatedVotes += this.voteTypeToNumber(o.voteType);
        });
    } else if (this.comment.vote == vote) {
      this.commentsService
        .removeCommentVote(this.comment.commentId.toString())
        .subscribe(o => {
          if (o == true && this.comment.vote != undefined) {
            this.comment.aggregatedVotes -= this.voteTypeToNumber(
              this.comment.vote
            );
            this.comment.vote = undefined;
          }
        });
    } else {
      this.commentsService
        .updateCommentVote(this.comment.commentId.toString(), vote)
        .subscribe(o => {
          this.comment.vote = o.voteType;
          this.comment.aggregatedVotes +=
            this.voteTypeToNumber(this.comment.vote) * 2;
        });
    }
  }

  public doUpvote(): void {
    this.createOrUpdateVote(VoteType.Upvote);
  }

  public doDownvote(): void {
    this.createOrUpdateVote(VoteType.Downvote);
  }

  enterEditMode(): void {
    this.editComText = this.comment.commentText;
    this.isInEditingMode = !this.isInEditingMode;
    this.show = !this.show;
  }

  updateComment() {
    if (this.editComText !== this.comment.commentText) {
      if (!this.editComText) {
        this.toastr.error('Comment can not be empty!', 'Comment Error');
      } else {
        this.commentsService
          .updateComment(
            this.editComText,
            this.comment.commentId,
            this.comment.version
          )
          .subscribe(
            (updComment: Comment) => {
              this.isInEditingMode = !this.isInEditingMode;
              this.comment = updComment;
            },
            () => {
              this.toastr.error(
                'Unable to update comment, please try again!',
                'Comment Error'
              );
              this.isInEditingMode = !this.isInEditingMode;
              this.show = !this.show;
            }
          );
      }
    } else {
      this.isInEditingMode = !this.isInEditingMode;
      this.show = !this.show;
    }
  }
}
