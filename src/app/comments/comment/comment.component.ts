import { Component, Input } from '@angular/core';
import { Comment } from '../../../Models/Comment.model';
import { Vote, VoteType } from '../../../Models/Vote.model';
import { CommentsService } from '../../../Services/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() comment: Comment;
  public voteType = VoteType;

  constructor(private commentsService: CommentsService) {}

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
    var date = new Date(this.comment?.commentDate);
    if (date == undefined)
      return "Some time ago"

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
      this.commentsService.postCommentVote(this.comment.commentId.toString(), vote).subscribe(o => {
        this.comment.vote = o.voteType;
        this.comment.aggregatedVotes += this.voteTypeToNumber(o.voteType);
      });
    } else if (this.comment.vote == vote) {
      this.commentsService.removeCommentVote(this.comment.commentId.toString()).subscribe(o => {
        if (o == true && this.comment.vote != undefined) {
          this.comment.aggregatedVotes -= this.voteTypeToNumber(this.comment.vote);
          this.comment.vote = undefined;
        }
      });
    } else {
      this.commentsService.updateCommentVote(this.comment.commentId.toString(), vote).subscribe(o => {
        this.comment.vote = o.voteType;
        this.comment.aggregatedVotes += this.voteTypeToNumber(this.comment.vote) * 2;
      });
    }
  }

  doUpvote(): void {
    this.createOrUpdateVote(VoteType.Upvote);
  }

  doDownvote(): void {
    this.createOrUpdateVote(VoteType.Downvote);
  }
}
