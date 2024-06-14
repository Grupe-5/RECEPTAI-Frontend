import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../Services/users.service';
import { AuthService } from '../../Services/auth.service';
import { RecipesService } from '../../Services/recipes.service';
import { Recipe } from '../../Models/Recipe.model';
import { IUser_Info } from '../../Models/User.model';
import { CommonModule } from '@angular/common';
import { RecipesCardSmallComponent } from './recipes-card-small/recipes-card-small.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserAccDeleteComponentModalComponent } from './user-acc-delete/user-acc-delete.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    UserAccDeleteComponentModalComponent,
    CommonModule,
    RecipesCardSmallComponent,
  ],
})
export class UserPageComponent implements OnInit {
  userInfo: IUser_Info | undefined;
  isUsersPage: boolean = false;
  userRecipes: Recipe[] = [];
  userAvatarPlaceHolder = '../../assets/imgs/user-avatar.png';
  private server: string;
  isPageLoaded = false;

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
    this.isPageLoaded = false;
    this.server = 'https://fooddit.domaskal.com' + '/api/image/';
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
        this.isPageLoaded = true;
      },
      err => {
        console.log(err);
        this.isPageLoaded = true;
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

  normalImgOrPlaceholder(imgId: number | undefined): string {
    if (imgId != undefined) {
      return this.server + imgId;
    } else {
      return this.userAvatarPlaceHolder;
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
