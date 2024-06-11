import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-menu-overlay',
  templateUrl: './mobile-menu-overlay.component.html',
  styleUrl: './mobile-menu-overlay.component.scss'
})
export class MobileMenuOverlayComponent {
  private _isMenuOpen = false;

  @Input() 
  get isMenuOpen(): boolean {
    return this._isMenuOpen;
  }
  set isMenuOpen(value: boolean) {
    this._isMenuOpen = value;
    this.isMenuOpenChange.emit(this._isMenuOpen);
  }

  @Input() isLoggedIn = false;
  @Input() profileImgUrl: string;

  @Output() isMenuOpenChange: EventEmitter<boolean> = new EventEmitter();


  constructor(private router: Router) {}

  isActiveRoute(route: string): boolean{

    return this.router.url == route;
  }

  goToUserPage(){
    this.router.navigate(['user', 'me']);
    this.isMenuOpen = false;
  }
  
}
