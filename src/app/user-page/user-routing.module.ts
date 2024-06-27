import { NgModule } from '@angular/core';
import { UserPageComponent } from './user-page.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: UserPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
