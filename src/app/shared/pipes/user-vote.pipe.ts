import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userVote'
})
export class UserVotePipe implements PipeTransform {

  transform(userVoteCount: number | undefined): string {
    if (userVoteCount) {
      if (userVoteCount >= 1000) {
        return (userVoteCount / 1000.0).toFixed(1);
      } else {
        return userVoteCount.toString();
      }
    } else {
      return '0';
    }
  }

}
