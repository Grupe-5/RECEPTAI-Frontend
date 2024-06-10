import { Component } from '@angular/core';
import { Router, NavigationStart} from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { Observable } from 'rxjs';
import { IUser } from '../../Models/User.model'
import { IUser_Info } from '../../Models/User.model'
import { SerachBarService } from '../../Services/search-bar.service'
import { environment } from '../../Environments/environment'
import { filter, pairwise } from 'rxjs/operators';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss'
})
export class NavigationComponent{
    status$: Observable<IUser | null>;
    isInRecipeRoute: Boolean = false;
    userImgId: number | undefined = undefined;
    userAvatarPlaceHolder = '../../assets/imgs/user-avatar.png';
    private server = environment.apiUrl + '/api/image/';
    profileImgUrl: string = ''; 

    constructor(
        private router: Router, 
        private authService: AuthService, 
        private serachBarService: SerachBarService,
    ) {}

    ngOnInit(){
        this.authService.getUserInfo().subscribe(
            (userInfo: IUser_Info) =>{
                this.userImgId = userInfo.imageId;
                this.profileImgUrl = this.normalImgOrPlaceholder(this.userImgId);
            }
        )

        this.router.events
        .pipe(filter((evt: any) => evt instanceof NavigationStart), pairwise())
        .subscribe((events: NavigationStart[]) => {
          if((events[0].url == '/sign-in' || events[0].url == '/register') && events[1].url == '/'){
              this.router.navigate(["/"]).then(()=>{
                  window.location.reload();
              })
          }
        });
        
        
        this.serachBarService.initSubFoodditNames();
    }

    normalImgOrPlaceholder(imgId: number): string {
        if (imgId != undefined) {
          return this.server + imgId;
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

    isLoggedIn(): boolean{
        return this.authService.isAuthenticated();
    }

    logOut(){
        this.authService.LogOut();
        this.router.navigate(['/']);
        this.ngOnInit();
    }

    goToUserPage(){
        this.router.navigate(['user', 'me']);
    }
    
}