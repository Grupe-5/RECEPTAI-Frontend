import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { Observable } from 'rxjs';
import { IUser } from '../../Models/User.model'
import { SerachBarService } from '../../Services/search-bar.service'

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss'
})
export class NavigationComponent{
    status$: Observable<IUser | null>;
    isInRecipeRoute: Boolean = false;

    constructor(private router: Router, private authService: AuthService, private serachBarService: SerachBarService) {}

    ngOnInit(){
        this.serachBarService.initSubFoodditNames();
    }
    shouldShowSearch(): Boolean{
        return this.shouldShowRegBtn() && this.shouldShowSignIn();
    }


    shouldShowRegBtn(): Boolean {
        return this.router.url !== '/register';
    }

    shouldShowSignIn(): Boolean {
        return this.router.url !== '/sign-in';
    }

    isLoggedIn(): Boolean{
        return this.authService.isAuthenticated();
    }
    logOut(){
        this.authService.LogOut();
    }
    
}