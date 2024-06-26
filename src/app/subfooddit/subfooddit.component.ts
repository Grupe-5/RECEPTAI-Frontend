import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Subfooddit } from '../../Models/Subfooddit.model';
import { SubfoodditService } from '../../Services/subfooddit.service';
import { AuthService } from '../../Services/auth.service';
import { Recipe } from '../../Models/Recipe.model';

@Component({
  selector: 'app-subfooddit',
  templateUrl: './subfooddit.component.html',
  styleUrl: './subfooddit.component.scss',
})
export class SubfoodditComponent implements OnInit {
  recipes: Recipe[] = [];
  subFooddit: Subfooddit | undefined;
  currUserHasJoined: boolean = false;
  subFoodditName: string;
  isPageLoaded: boolean = false;

  private _joinedUserCount: number = 0;
  get joinedUserCount(): string {
    return (
      String(this._joinedUserCount) +
      ' ' +
      (this._joinedUserCount > 1 ? 'Members' : 'Member')
    );
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private subfoodditService: SubfoodditService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.isPageLoaded = false;
    this.route.params.subscribe((params: Params) => {
      if (params) {
        this.initSubFpoddit();
      }
    });
  }

  private initSubFpoddit() {
    this.subFoodditName = this.parseSubFooditName(this.router.url);
    this.subfoodditService.getSubfooddits().subscribe((resp: Subfooddit[]) => {
      const subFoodditInfo = resp.find(
        (sf: Subfooddit) =>
          sf.title.toLowerCase() === this.subFoodditName.toLowerCase()
      );

      if (subFoodditInfo === undefined) {
        this.router.navigate(['/']);
      } else {
        this.subFooddit = subFoodditInfo;
        if(this.authService.isAuthenticated()) {
          this.subfoodditService.getSubfoodditsByUserId().subscribe(
            (subfoodits: Subfooddit[]) => {
              this.currUserHasJoined = subfoodits.some(
                sf => sf.subfoodditId == this.subFooddit?.subfoodditId
              );
              this.isPageLoaded = true;
            },
            err => {
              console.log(err);
              this.isPageLoaded = true;
            }
          );
        }
        this.subfoodditService
          .getUserBySubfooddits(this.subFooddit.subfoodditId)
          .subscribe(
            resp => {
              this._joinedUserCount = resp.length;
              this.isPageLoaded = true;
            },
            (err)=>{
                if(err.status === 404){
                  this._joinedUserCount = 0;
                  this.isPageLoaded = true;
                }
            });
      }
    });
  }

  private parseSubFooditName(url: string): string {
    const regex = '/f/([^/]+)/?$';
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    } else {
      return '';
    }
  }

  public joinSubFooddit() {
    if (this.currUserHasJoined && this.subFooddit) {
      this.subfoodditService
        .leaveSubFoodit(this.subFooddit.subfoodditId)
        .subscribe(() => {
          this.currUserHasJoined = false;
          // TODO: Make this without needing to reload (Upde navigation subf list)
          window.location.reload();
        });
    } else {
      if(this.subFooddit){
        this.subfoodditService
          .joinSubfoodit(this.subFooddit.subfoodditId)
          .subscribe(() => {
            this.currUserHasJoined = true;
            window.location.reload();
          });
      }
    }
  }
}
