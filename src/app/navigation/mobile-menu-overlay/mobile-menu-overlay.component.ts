import { Component, Input, model } from '@angular/core';

@Component({
  selector: 'app-mobile-menu-overlay',
  templateUrl: './mobile-menu-overlay.component.html',
  styleUrl: './mobile-menu-overlay.component.scss',
})
export class MobileMenuOverlayComponent {
  isMenuOpen = model.required<boolean>();

  @Input() isLoggedIn = false;
  @Input() profileImgUrl: number | undefined;

  constructor() {}

  public closeMenu() {
    this.isMenuOpen.set(false);
  }
}
