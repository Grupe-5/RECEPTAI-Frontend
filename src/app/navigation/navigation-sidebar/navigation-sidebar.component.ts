import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SubfoodditService } from '../../../Services/subfooddit.service'
import { Subfooddit } from '../../../Models/Subfooddit.model'
@Component({
  selector: 'app-navigation-sidebar',
  templateUrl: './navigation-sidebar.component.html',
  styleUrl: './navigation-sidebar.component.scss'
})
export class NavigationSidebarComponent {
  usersSubFooddits: Subfooddit[] = [];
  isPageLoaded: boolean = false;

  constructor(private router: Router, private subfoodditService: SubfoodditService) {}

  ngOnInit(){
    this.subfoodditService.getSubfoodditsByUserId().subscribe(
      (resp: Subfooddit[])=>{
        console.log(resp)
        this.usersSubFooddits = resp;
        this.isPageLoaded = true;
      },
      err => err,
    )
  }

  isActiveHome(): boolean {
    return this.router.url == '/';
  }

  isActiveCreate(): boolean {
    return this.router.url == '/create';
  }

  isActiveCreateSubf(): boolean {
    return this.router.url == 'subf/create';
  }
  
  checkIfEmpty(): boolean{
    return this.usersSubFooddits.length == 0;
  }

}
