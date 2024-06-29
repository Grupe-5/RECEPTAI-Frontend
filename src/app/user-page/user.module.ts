import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesCardSmallComponent } from './recipes-card-small/recipes-card-small.component';
import { UserAccDeleteComponentModalComponent } from './user-acc-delete/user-acc-delete.component';
import { UserPageComponent } from './user-page.component';
import { UserRoutingModule } from './user-routing.module'
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [
    RecipesCardSmallComponent,
    UserPageComponent,
    UserAccDeleteComponentModalComponent,
  ],
    
  imports: [
    CommonModule,
    UserRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    SharedModule
  ]
})
export class UserModule { }
