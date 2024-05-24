import { VoteType } from "./Vote.model";

export class Comment {
  commentId: number;
  userName: string;
  commentText: string;
  commentDate: string;
  aggregatedVotes: number;
  recipeId: number;
  // If current user voted for this comment, then non-null
  vote: VoteType | undefined;
}
