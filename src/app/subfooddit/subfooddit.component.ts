import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subfooddit',
  templateUrl: './subfooddit.component.html',
  styleUrl: './subfooddit.component.scss'
})
export class SubfoodditComponent {
  foodditName: string = "";

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.foodditName = this.parseSubFooditName("/f/cas/");
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


  

}
