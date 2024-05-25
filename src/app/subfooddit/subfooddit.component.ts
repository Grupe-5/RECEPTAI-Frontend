import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subfooddit } from '../../Models/Subfooddit.model'
import { SubfoodditService } from '../../Services/subfooddit.service'
import { AuthService } from '../../Services/auth.service'
import { RecipesService } from '../../Services/recipes.service'
import { Recipe } from '../../Models/Recipe.model'

@Component({
  selector: 'app-subfooddit',
  templateUrl: './subfooddit.component.html',
  styleUrl: './subfooddit.component.scss'
})
export class SubfoodditComponent {
  recipes: Recipe[] = [];
  subFooddit: Subfooddit;
  currUserHasJoined: boolean = false;
  joinedUserCount: number = 0;
  subFoodditName: string;
  
  constructor(private router: Router, private route: ActivatedRoute,  private subfoodditService: SubfoodditService, private authService: AuthService, private recipeService: RecipesService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) =>{
      if(params){
        this.initNewSubF()
      }
    });
  }

  initNewSubF(){
    this.subFoodditName = this.parseSubFooditName(this.router.url);
    this.subfoodditService.getSubfooddits().subscribe((resp: Subfooddit[]) => {
      let subFoodditInfo = resp.find((sf: Subfooddit) => sf.title.toLowerCase() === this.subFoodditName.toLowerCase());
      
      if(subFoodditInfo === undefined){
        this.router.navigate(['/']);
      }else{
        this.subFooddit = subFoodditInfo;
        this.subfoodditService.getSubfoodditsByUserId().subscribe(
          (foodits: Subfooddit[]) =>{
            
            this.currUserHasJoined = foodits.some((sf) => sf.subfoodditId == this.subFooddit.subfoodditId); 
          },
          // Handle error
          err => err,
        )
        this.subfoodditService.getUserBySubfooddits(this.subFooddit.subfoodditId).subscribe((resp)=>{
          this.joinedUserCount = resp.length;
        })
      }
    })
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
    return String(this.joinedUserCount) + ' ' + (this.joinedUserCount > 1 ? "Members" : "Member") 
  }

  isLoggedIn(): Boolean{
    return this.authService.isAuthenticated();
  }

  joinSubFooddit(){
    if(!this.isLoggedIn()){
      this.router.navigate(['/sign-in']);
    }else{

      if(this.currUserHasJoined){
        this.subfoodditService.leaveSubFoodit(this.subFooddit.subfoodditId).subscribe((resp) =>{
          this.currUserHasJoined = false;
          window.location.reload();

        })
      }else{
        this.subfoodditService.joinSubfoodit(this.subFooddit.subfoodditId).subscribe((resp) =>{
          this.currUserHasJoined = true;
          window.location.reload();
        })
      }
    }
  }

  showJoin(): boolean {
    if(!this.isLoggedIn()){
      return true;
    }
    return !this.currUserHasJoined;
  }


}
