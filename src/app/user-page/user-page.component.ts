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
  
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private usersService: UsersService, 
    private authService: AuthService,
    private recipesService: RecipesService,
    public dialog: MatDialog,
  ){}
  
  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      let userId: string | number | null;
      let currUser: IUser_Info | null = null;
      userId = params.get('id');
      if(userId == null){
        this.router.navigate(['/']);
      }

      if(userId == "Me"){
        if(this.authService.isAuthenticated() == true){
          this.authService.getUserInfo().subscribe((user: IUser_Info)=>{
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
    },
    (err)=>{
      console.log("Error while fetching user recipes");
    })

  }

  formatDate(date: Date): string{

    const dateFormated = new Date(date);

    return dateFormated.toLocaleDateString();
  }
  
  // TODO: change profile pic
  changeProfilePicture(){
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
