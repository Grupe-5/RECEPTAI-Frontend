import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { IUser_Info } from '../../Models/User.model';
import { SerachBarService } from '../../Services/search-bar.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  isInRecipeRoute: boolean = false;
  userImgId: number | undefined = undefined;
  profileImgUrl: number | undefined = undefined;
  isMobileMenuOpen: boolean = false;
  isPageLoaded: boolean;
  destroyRef = inject(DestroyRef);
  private currUser = this.authService.stateItem;
  
  constructor(
    public router: Router,
    private authService: AuthService,
    private serachBarService: SerachBarService
  ) {
  }
  
  ngOnInit() {
    this.currUser.subscribe(()=>{
      this.fetchNewUserData()
    })
    this.serachBarService.initSubFoodditNames();
  }

  fetchNewUserData(){
    this.isPageLoaded = false;
    if(this.authService.isAuthenticated()){
      this.authService.getUserInfo().subscribe({
        next: (userInfo: IUser_Info) => {
          this.profileImgUrl = userInfo.imageId ? userInfo.imageId : undefined;
        },
        error: (err) =>{
          console.log(err)
        },
        complete: () =>{
          this.isPageLoaded = true;
        }
      });
    }else{
      this.isPageLoaded = true;
    }
  }

  public get shouldShowRegBtn(): boolean {
    return this.router.url !== '/register';
  }

  public get shouldShowUserIcon(): boolean {
    return !this.router.url.includes('/user/me') && this.isPageLoaded;
  }

  public get shouldShowSignIn(): boolean {
    return this.router.url !== '/sign-in';
  }

  public get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  public logOut() {
    this.authService.LogOut();
    this.router.navigate(['/']);
    this.ngOnInit();
  }

  public toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  public onMenuOpenChange(isOpen: boolean) {
    this.isMobileMenuOpen = isOpen;
  }
}
