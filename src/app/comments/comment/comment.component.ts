import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../../Models/Comment.model';
import { VoteType } from '../../../Models/Vote.model';
import { CommentsService } from '../../../Services/comments.service';
import { AuthService } from '../../../Services/auth.service';
import { IUser_Info } from '../../../Models/User.model';
import { ToastrService } from 'ngx-toastr';

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

  // TODO: convert this to PIPE and change other places
  getVoteCount(): string {
    const cnt = this.comment?.aggregatedVotes;
    if (cnt >= 1000) {
      return (cnt / 1000.0).toFixed(1);
    } else {
      return cnt.toString();
    }
  }

  getHoursOrMinutesFromToday(): string {
    const date = new Date(this.comment?.commentDate);
    if (date == undefined) return 'Some time ago';

    const currentDate = new Date();
    const diffMilliseconds = currentDate.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    }
  }

  voteTypeToNumber(vote: VoteType): number {
    if (vote == VoteType.Upvote) {
      return 1;
    } else {
      return -1;
    }
  }

  createOrUpdateVote(vote: VoteType): void {
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

  doUpvote(): void {
    if (this.authService.isAuthenticated()) {
      this.createOrUpdateVote(VoteType.Upvote);
    } else {
      this.toastr.error('You have to sign-in to vote!', 'Comment Vote Error');
    }
  }

  doDownvote(): void {
    if (this.authService.isAuthenticated()) {
      this.createOrUpdateVote(VoteType.Downvote);
    } else {
      this.toastr.error('You have to sign-in to vote!', 'Comment Vote Error');
    }
  }

  enterEditMode(): void {
    this.editComText = this.comment.commentText;
    this.isInEditingMode = !this.isInEditingMode;
    this.show = !this.show;
  }

  updateComment() {
    if (this.editComText !== this.comment.commentText) {
      if (!this.editComText) {
        this.toastr.error('Updated comment can not be empty!', 'Comment Error');
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
