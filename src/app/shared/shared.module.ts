import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimestampPipe } from './pipes/timestamp.pipe';
import { UserVotePipe } from './pipes/user-vote.pipe';
import { AuthenticatedDirective } from './directives/authenticated.directive';
import { UseImgOrPlaceholderDirective } from './directives/use-img-or-placeholder.directive';


@NgModule({
  declarations: [
    TimestampPipe,
    UserVotePipe,
    AuthenticatedDirective,
    UseImgOrPlaceholderDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TimestampPipe,
    UserVotePipe,
    AuthenticatedDirective,
    UseImgOrPlaceholderDirective
  ]
})
export class SharedModule { }
