import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss'
})
export class NavigationComponent{
    isLoggedIn: Boolean = true;
    
    constructor(private router: Router) {}

    shouldShowSearch(): Boolean{
        return this.shouldShowRegBtn() && this.shouldShowSignIn();
    }


    shouldShowRegBtn(): Boolean {
        return this.router.url !== '/register';
    }

    shouldShowSignIn(): Boolean {
        return this.router.url !== '/sign-in';
    }
    
}