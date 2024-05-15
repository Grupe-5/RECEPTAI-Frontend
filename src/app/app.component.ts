import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router) {}

  isLoggedIn: Boolean = true;
  isInRecipeRoute: Boolean = false;
  
  isRouteRecipePage(): boolean {
    return this.router.url.startsWith('/recipe/');
  }

}
