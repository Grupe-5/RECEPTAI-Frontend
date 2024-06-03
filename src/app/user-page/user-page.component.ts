import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../Services/users.service'
import { AuthService } from '../../Services/auth.service'
import { RecipesService } from '../../Services/recipes.service'
import { Recipe } from '../../Models/Recipe.model'
import { IUser_Info } from '../../Models/User.model'
import { CommonModule } from '@angular/common';
import { RecipesCardSmallComponent } from './recipes-card-small/recipes-card-small.component'
import { MatDialog } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserAccDeleteComponentModal } from './user-acc-delete/user-acc-delete.component'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, UserAccDeleteComponentModal, CommonModule, RecipesCardSmallComponent],
})
export class UserPageComponent {
  userInfo: IUser_Info;
  isUsersPage: Boolean = false;
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
  ){}
  
  ngOnInit(): void {
    this.server = this.authService.getCurrEnvUrl() + '/api/image/';
    this.route.paramMap.subscribe(params => {
      let userId: string | number | null;
      
      userId = params.get('id');
      if(userId == null){
        this.router.navigate(['/']);
      }

      if(userId == "me"){
        if(this.authService.isAuthenticated() == true){
          this.authService.getUserInfo().subscribe((user: IUser_Info)=>{
            this.isUsersPage = true;
            this.userInfo = user;
            this.getUsersRecipes(user.id);
          })
        }
        else{
          this.router.navigate(['/']);
        }
      } else{
        if(Number(userId)){
          this.usersService.getUserInfo(Number(userId)).subscribe(
          (user: IUser_Info) =>{
            this.userInfo = user;
            this.getUsersRecipes(user.id)
            if(this.authService.isAuthenticated() == true){
              this.authService.getUserInfo().subscribe((user: IUser_Info)=>{
                this.isUsersPage = this.userInfo.id == user.id;
              })
            }
          },
          error =>{
            this.router.navigate(['/']);
          })
        }
        else{
          this.router.navigate(['/']);
        }
      }
    });
  }

  getUsersRecipes(userId: number){
    this.recipesService.getRecipeByUserId(userId).subscribe((recipes: Recipe[]) =>{
      this.userRecipes = recipes;
      this.isPageLoaded = true;
    },
    (err)=>{
      console.log("Error while fetching user recipes");
    })

  }

  formatDate(date: Date): string{

    const dateFormated = new Date(date);

    return dateFormated.toLocaleDateString();
  }
  
  changeProfilePicture(event: any){
    const file = event.target.files[0];
    if (file) {
      this.usersService.updateUserImg(file).subscribe(
        (resp)=>{
          this.toastr.success("Image changed successfully");
          window.location.reload();
        },
        error=>{
          console.log(error);
        })
    } else {
      this.toastr.error("Invalid file, try again.", "User profile Error");
    }
  }

  normalImgOrPlaceholder(imgId: number): string {
    if (imgId != undefined) {
      return this.server + imgId;
    } else {
      return this.userAvatarPlaceHolder;
    }
  }

  deleteUserAccount(){
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserAccDeleteComponentModal);

    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        this.usersService.deleteUserAccount().subscribe((resp: any)=>{
          console.log("deleted successfully");
          this.authService.LogOut();
          this.router.navigate(['/']);
        },
        // TODO: handle error
        (err)=>{
          console.log(err)
        })
      }
    });
  }
  
}
