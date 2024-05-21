import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { IUser } from '../Models/User.model'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isInRecipeRoute: Boolean = false;
  constructor(private router: Router, private authService: AuthService) {}
  isRouteRecipePage(): boolean {
    return this.router.url.startsWith('/recipe/');
  }

  isLoggedIn(): Boolean{
    return this.authService.isAuthenticated();
  }
}
