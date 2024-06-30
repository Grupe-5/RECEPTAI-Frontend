import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  public isRouteRecipePage(): boolean {
    return this.router.url.startsWith('/recipe/');
  }

  public isRouteSubfoodditPage(): boolean {
    return this.router.url.startsWith('/f/');
  }

  public isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}
