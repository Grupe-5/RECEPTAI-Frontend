export enum VoteType {
  Downvote = 0,
  Upvote = 1,
}

export class Vote {
  public voteType: VoteType;
  public voteDate: Date;
}
