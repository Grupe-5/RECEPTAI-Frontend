import { Component, OnInit, WritableSignal } from '@angular/core';
import { SubfoodditService } from '../../../Services/subfooddit.service';
import { Subfooddit } from '../../../Models/Subfooddit.model';
@Component({
  selector: 'app-navigation-sidebar',
  templateUrl: './navigation-sidebar.component.html',
  styleUrl: './navigation-sidebar.component.scss',
})
export class NavigationSidebarComponent implements OnInit {
  usersSubFooddits: WritableSignal<Subfooddit[]> = this.subfoodditService.userSubFooddits;
  isPageLoaded: boolean;

  constructor(
    private subfoodditService: SubfoodditService
  ) {}

  ngOnInit() {
    this.isPageLoaded = false;

    this.subfoodditService.getSubfoodditsByUserId().subscribe({
      
      error: err => {
        console.log(err);
      },
      complete: () => {
        this.isPageLoaded = true;
      }
    });
  }
}
