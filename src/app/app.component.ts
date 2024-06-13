import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isInRecipeRoute: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  isRouteRecipePage(): boolean {
    return this.router.url.startsWith('/recipe/');
  }

  isRouteSubfoodditPage(): boolean {
    return this.router.url.startsWith('/f/');
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}
