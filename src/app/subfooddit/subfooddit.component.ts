import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subfooddit',
  templateUrl: './subfooddit.component.html',
  styleUrl: './subfooddit.component.scss'
})
export class SubfoodditComponent {
  foodditName: string = "";

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.foodditName = this.parseSubFooditName(this.router.url);
    if(this.foodditName == ""){
      // TODO: return error/reroute
    }
    
    // TODO: Check if valid foodditName or reroute otherwise
  }

  parseSubFooditName(url: string): string {
    
    const regex = '\/f\/([^\/]+)\/?$'
    const match = url.match(regex);
    if (match && match[1]) {
        return match[1];
    } else {
        return "";
    }
  }

  getUsersCountText(): String{
    let length: number = 5;
    return String(length) + ' ' + (length > 1 ? "Members" : "Member") 
  }
}
