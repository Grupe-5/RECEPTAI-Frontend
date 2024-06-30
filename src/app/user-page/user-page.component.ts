import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../Services/users.service';
import { AuthService } from '../../Services/auth.service';
import { RecipesService } from '../../Services/recipes.service';
import { Recipe } from '../../Models/Recipe.model';
import { IUser_Info } from '../../Models/User.model';
import { MatDialog } from '@angular/material/dialog';
import { UserAccDeleteComponentModalComponent } from './user-acc-delete/user-acc-delete.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent implements OnInit {
  userInfo: IUser_Info | undefined;
  isUsersPage: boolean = false;
  userRecipes: Recipe[] = [];
  isUserInfoLoaded = false;
  isRecipesLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private authService: AuthService,
    private recipesService: RecipesService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isUserInfoLoaded = false;
    this.isRecipesLoaded = false;

    this.route.paramMap.subscribe(params => {
      const userId: string | number | null = params.get('id');
      if (userId == null) {
        this.router.navigate(['/']);
      }

      if (userId == 'me') {
        if (this.authService.isAuthenticated() == true) {
          this.authService.getUserInfo().subscribe((user: IUser_Info) => {
            this.isUsersPage = true;
            this.userInfo = user;
            this.isUserInfoLoaded = true;
            this.getUsersRecipes(user.id);
          });
        } else {
          this.router.navigate(['/']);
        }
      } else {
        if (Number(userId)) {
          this.usersService.getUserInfo(Number(userId)).subscribe(
            (user: IUser_Info) => {
              this.userInfo = user;
              this.isUserInfoLoaded = true;
              this.getUsersRecipes(user.id);
              if (this.authService.isAuthenticated() == true) {
                this.authService.getUserInfo().subscribe((user: IUser_Info) => {
                  this.isUsersPage = this.userInfo?.id == user.id;
                });
              }
            },
            error => {
              console.log(error);
              this.router.navigate(['/']);
            }
          );
        } else {
          this.router.navigate(['/']);
        }
      }
    });
  }

  getUsersRecipes(userId: number) {
    this.recipesService.getRecipeByUserId(userId).subscribe(
      (recipes: Recipe[]) => {
        this.userRecipes = recipes;
        this.isRecipesLoaded = true;
      },
      err => {
        console.log(err);
        this.isRecipesLoaded = true;
      }
    );
  }

  formatDate(date: Date | undefined): string {
    if(date){
      const dateFormated = new Date(date);
  
      return dateFormated.toLocaleDateString();
    }
    
    return '';
  }

  changeProfilePicture(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];

    if (file) {
      this.usersService.updateUserImg(file).subscribe(
        () => {
          this.toastr.success('Image changed successfully');
          window.location.reload();
        },
        error => {
          console.log(error);
          this.toastr.error('Something wen wrong, try again.', 'User profile Error');
        }
      );
    } else {
      this.toastr.error('Invalid file, try again.', 'User profile Error');
    }
  }

  deleteUserAccount() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserAccDeleteComponentModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.usersService.deleteUserAccount().subscribe(
          () => {
            this.authService.LogOut();
            this.router.navigate(['/']);
          },
          // TODO: handle error
          err => {
            console.log(err);
          }
        );
      }
    });
  }

  signOut() {
    this.authService.LogOut();
    this.router.navigate(['/']);
  }
}
