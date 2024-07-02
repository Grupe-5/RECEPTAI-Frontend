import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubfoodditService } from '../../../Services/subfooddit.service';
import { Subfooddit } from '../../../Models/Subfooddit.model';
@Component({
  selector: 'app-navigation-sidebar',
  templateUrl: './navigation-sidebar.component.html',
  styleUrl: './navigation-sidebar.component.scss',
})
export class NavigationSidebarComponent implements OnInit {
  usersSubFooddits: Subfooddit[];
  isPageLoaded: boolean;

  constructor(
    private router: Router,
    private subfoodditService: SubfoodditService
  ) {}

  ngOnInit() {
    this.isPageLoaded = false;

    this.subfoodditService.getSubfoodditsByUserId().subscribe({
      next: (resp: Subfooddit[]) => {
        this.usersSubFooddits = resp;
      },
      error: err => {
        console.log(err);
      },
      complete: () => {
        this.isPageLoaded = true;
      }
    });
  }

  public isActiveHome(): boolean {
    return this.router.url == '/';
  }

  public isActiveCreate(): boolean {
    return this.router.url == '/create';
  }

  public isActiveCreateSubf(): boolean {
    return this.router.url == '/subf/create';
  }

}
