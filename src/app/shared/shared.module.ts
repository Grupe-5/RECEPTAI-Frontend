import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimestampPipe } from './pipes/timestamp.pipe';
import { UserVotePipe } from './pipes/user-vote.pipe';
import { AuthenticatedDirective } from './directives/authenticated.directive';


@NgModule({
  declarations: [
    TimestampPipe,
    UserVotePipe,
    AuthenticatedDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TimestampPipe,
    UserVotePipe,
    AuthenticatedDirective
  ]
})
export class SharedModule { }
