import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { Observable } from 'rxjs';
import { IUser } from '../../Models/User.model'
import { IUser_Info } from '../../Models/User.model'
import { SerachBarService } from '../../Services/search-bar.service'
import { environment } from './../../environments/environment'

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss'
})
export class NavigationComponent{
    status$: Observable<IUser | null>;
    isInRecipeRoute: Boolean = false;
    isLoggedIn: boolean;
    userImgId: number | undefined = undefined;
    userAvatarPlaceHolder = '../../assets/imgs/user-avatar.png';
    private server = environment.apiUrl + '/api/image/';

    constructor(
        private router: Router, 
        private authService: AuthService, 
        private serachBarService: SerachBarService,
    ) {}

    ngOnInit(){
        this.serachBarService.initSubFoodditNames();
        this.isLoggedIn = this.authService.isAuthenticated();
        if(this.isLoggedIn){
            this.authService.getUserInfo().subscribe(
                (userInfo: IUser_Info) =>{
                    this.userImgId = userInfo.imageId;
                }
            )
        }
    }

    normalImgOrPlaceholder(): string {
        if (this.userImgId != undefined) {
          return this.server + this.userImgId;
        } else {
          return this.userAvatarPlaceHolder;
        }
      }

    shouldShowSearch(): Boolean{
        return this.shouldShowRegBtn() && this.shouldShowSignIn();
    }

    shouldShowRegBtn(): Boolean {
        return this.router.url !== '/register';
    }
    
    shouldShowUserIcon(): Boolean{
        return !this.router.url.includes('/user/');
    }

    shouldShowSignIn(): Boolean {
        return this.router.url !== '/sign-in';
    }

    logOut(){
        this.authService.LogOut();
        this.router.navigate(['/']);
    }

    goToUserPage(){
        this.router.navigate(['user', 'me']);
    }
    
}