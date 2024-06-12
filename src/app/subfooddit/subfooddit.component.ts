import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subfooddit } from '../../Models/Subfooddit.model';
import { SubfoodditService } from '../../Services/subfooddit.service';
import { AuthService } from '../../Services/auth.service';
import { RecipesService } from '../../Services/recipes.service';
import { Recipe } from '../../Models/Recipe.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subfooddit',
  templateUrl: './subfooddit.component.html',
  styleUrl: './subfooddit.component.scss',
})
export class SubfoodditComponent implements OnInit {
  recipes: Recipe[] = [];
  subFooddit: Subfooddit;
  currUserHasJoined: boolean = false;
  joinedUserCount: number = 0;
  subFoodditName: string;
  isPageLoaded: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private subfoodditService: SubfoodditService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isPageLoaded = false;
    this.route.params.subscribe((params: any) => {
      if (params) {
        this.initNewSubF();
      }
    });
  }

  initNewSubF() {
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
        this.subfoodditService.getSubfoodditsByUserId().subscribe(
          (foodits: Subfooddit[]) => {
            this.isPageLoaded = true;
            this.currUserHasJoined = foodits.some(
              sf => sf.subfoodditId == this.subFooddit.subfoodditId
            );
          },
          err => {
            console.log(err);
            this.isPageLoaded = true;
          }
        );
        this.subfoodditService
          .getUserBySubfooddits(this.subFooddit.subfoodditId)
          .subscribe(resp => {
            this.joinedUserCount = resp.length;
            this.isPageLoaded = true;
          });
      }
    });
  }

  parseSubFooditName(url: string): string {
    const regex = '/f/([^/]+)/?$';
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    } else {
      return '';
    }
  }

  getUsersCountText(): string {
    return (
      String(this.joinedUserCount) +
      ' ' +
      (this.joinedUserCount > 1 ? 'Members' : 'Member')
    );
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  joinSubFooddit() {
    if (!this.isLoggedIn()) {
      this.toastr.error(
        'You have to sign-in to join subfooddits!',
        'Subfooddit Error'
      );
    } else {
      if (this.currUserHasJoined) {
        this.subfoodditService
          .leaveSubFoodit(this.subFooddit.subfoodditId)
          .subscribe(resp => {
            this.currUserHasJoined = false;
            window.location.reload();
          });
      } else {
        this.subfoodditService
          .joinSubfoodit(this.subFooddit.subfoodditId)
          .subscribe(resp => {
            this.currUserHasJoined = true;
            window.location.reload();
          });
      }
    }
  }

  showJoin(): boolean {
    if (!this.isLoggedIn()) {
      return true;
    }
    return !this.currUserHasJoined;
  }
}
