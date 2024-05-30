import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { Observable } from 'rxjs';
import { IUser } from '../../Models/User.model';
import { SerachBarService } from '../../Services/search-bar.service';
import {OverlayModule} from '@angular/cdk/overlay';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  status$: Observable<IUser | null>;
  isInRecipeRoute: Boolean = false;

  constructor(private router: Router, private authService: AuthService, private serachBarService: SerachBarService) {}

  ngOnInit() {
    this.serachBarService.initSubFoodditNames();
  }

  shouldShowSearch(): Boolean {
    return this.shouldShowRegBtn() && this.shouldShowSignIn();
  }

  shouldShowRegBtn(): Boolean {
    return this.router.url !== '/register';
  }

  shouldShowUserIcon(): Boolean {
    return !this.router.url.includes('/user/');
  }

  shouldShowSignIn(): Boolean {
    return this.router.url !== '/sign-in';
  }

  shouldShowMailBtn(): Boolean {
    return true;
  }

  isLoggedIn(): Boolean {
    return this.authService.isAuthenticated();
  }

  logOut() {
    this.authService.LogOut();
    this.router.navigate(['/']);
  }

  goToUserPage() {
    this.router.navigate(['user', 'me']);
  }

sendMail() {
    const mailtoLink = `https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&to=support@fooddit.com`;
    window.location.href = mailtoLink;
}

}
