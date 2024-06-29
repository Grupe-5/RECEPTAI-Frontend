import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimestampPipe } from './pipes/timestamp.pipe';
import { UserVotePipe } from './pipes/user-vote.pipe';


@NgModule({
  declarations: [
    TimestampPipe,
    UserVotePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TimestampPipe,
    UserVotePipe
  ]
})
export class SharedModule { }
