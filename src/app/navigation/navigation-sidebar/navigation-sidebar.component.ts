import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-sidebar',
  templateUrl: './navigation-sidebar.component.html',
  styleUrl: './navigation-sidebar.component.scss'
})
export class NavigationSidebarComponent {
  constructor(private router: Router) {}

  isActiveHome(): boolean {
    return this.router.url == '/';
  }

  isActiveCreate(): boolean {
    return this.router.url == '/create';
  }

}
