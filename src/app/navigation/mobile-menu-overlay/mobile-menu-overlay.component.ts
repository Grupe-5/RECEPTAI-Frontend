import { Component, Input, model } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-menu-overlay',
  templateUrl: './mobile-menu-overlay.component.html',
  styleUrl: './mobile-menu-overlay.component.scss',
})
export class MobileMenuOverlayComponent {
  isMenuOpen = model.required<boolean>();

  @Input() isLoggedIn = false;
  @Input() profileImgUrl: number | undefined;

  constructor(private router: Router) {}

  isActiveRoute(route: string): boolean {
    return this.router.url == route;
  }

  goToUserPage() {
    this.isMenuOpen.set(false);
  }
}
