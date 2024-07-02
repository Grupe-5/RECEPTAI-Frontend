import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { IUser_Info } from '../../Models/User.model';
import { SerachBarService } from '../../Services/search-bar.service';
import { filter, pairwise } from 'rxjs/operators';

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

  constructor(
    public router: Router,
    private authService: AuthService,
    private serachBarService: SerachBarService
  ) {}

  ngOnInit() {
    this.isPageLoaded = false;
    if(this.authService.isAuthenticated()){
      this.authService.getUserInfo().subscribe((userInfo: IUser_Info) => {
        this.profileImgUrl = userInfo.imageId ? userInfo.imageId : undefined;
        this.isPageLoaded = true;
      });
    }

    const routerSubscription = this.router.events
      .pipe(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        filter((evt: any) => evt instanceof NavigationStart),
        pairwise()
      )
      .subscribe((events: NavigationStart[]) => {
        if (
          (events[0].url == '/sign-in' || events[0].url == '/register') &&
          events[1].url == '/'
        ) {
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        }
      });
      
    this.destroyRef.onDestroy(() =>{routerSubscription.unsubscribe();})

    this.serachBarService.initSubFoodditNames();
  }

  public shouldShowRegBtn(): boolean {
    return this.router.url !== '/register';
  }

  public shouldShowUserIcon(): boolean {
    return !this.router.url.includes('/user/me') && this.isPageLoaded;
  }

  public shouldShowSignIn(): boolean {
    return this.router.url !== '/sign-in';
  }

  public isLoggedIn(): boolean {
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
