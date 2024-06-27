import { Component } from '@angular/core';
import {
  MatDialogRef,
} from '@angular/material/dialog';
import { UserPageComponent } from '../user-page.component';

@Component({
  selector: 'app-user-acc-delete',
  templateUrl: './user-acc-delete.component.html',
  styleUrl: './user-acc-delete.component.scss',
})
export class UserAccDeleteComponentModalComponent {
  constructor(public dialogRef: MatDialogRef<UserPageComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
