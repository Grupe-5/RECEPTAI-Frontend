import { Component } from '@angular/core';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserPageComponent } from '../user-page.component';

@Component({
  selector: 'app-user-acc-delete',
  templateUrl: './user-acc-delete.component.html',
  styleUrl: './user-acc-delete.component.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class UserAccDeleteComponentModal {
  constructor(public dialogRef: MatDialogRef<UserPageComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
