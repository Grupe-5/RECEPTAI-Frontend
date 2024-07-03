import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subfooddit } from '../../Models/Subfooddit.model';
import { SubfoodditService } from '../../Services/subfooddit.service';
import { AuthService } from '../../Services/auth.service';
import { Recipe } from '../../Models/Recipe.model';

@Component({
  selector: 'app-subfooddit',
  templateUrl: './subfooddit.component.html',
  styleUrl: './subfooddit.component.scss',
})
export class SubfoodditComponent {
  public recipes: Recipe[] = [];
  public subFooddit: Subfooddit;
  public currUserHasJoined: boolean = false;
  public isPageLoaded: boolean = false;

  @Input() // Injected via url (or not)
  set subfoodit(subfooditName: string){
    this.isPageLoaded = false;
    this.subfoodditService.getSubfooddits().subscribe((resp: Subfooddit[]) => {
      const subFoodditInfo: Subfooddit | undefined = resp.find(
        (sf: Subfooddit) =>
          sf.title.toLowerCase() === subfooditName.toLowerCase()
      );

      if (subFoodditInfo === undefined) {
        this.router.navigate(['/']);
      }else{
        this.subFooddit = subFoodditInfo;
        this.initSubFooddit();
      }
    });
  }

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
    private subfoodditService: SubfoodditService,
    private authService: AuthService,
  ) {}


  private initSubFooddit() {
    if(this.authService.isAuthenticated()) {
      this.subfoodditService.getSubfoodditsByUserId().subscribe({
        next: (subfoodits: Subfooddit[]) => {
          this.currUserHasJoined = subfoodits.some(
            sf => sf.subfoodditId == this.subFooddit?.subfoodditId
          );
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.isPageLoaded = true;
        }
      });
    }
    this.subfoodditService
      .getUserBySubfooddits(this.subFooddit.subfoodditId)
      .subscribe({
        next: resp => {
          this._joinedUserCount = resp.length;
        },
        error: (err) => {
          if(err.status === 404){
            this._joinedUserCount = 0;
          }
        },
        complete: () => {
          this.isPageLoaded = true;
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
          this._joinedUserCount -= 1;
        });
      } else {
      if(this.subFooddit){
        this.subfoodditService
          .joinSubfoodit(this.subFooddit.subfoodditId)
          .subscribe(() => {
            this.currUserHasJoined = true;
            this._joinedUserCount += 1;
        });
      }
    }
  }
}
