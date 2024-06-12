import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../Models/Recipe.model';
import { RecipesService } from '../../Services/recipes.service';
import { SubfoodditService } from '../../Services/subfooddit.service';
import { Subfooddit } from '../../Models/Subfooddit.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  @Input() ShowTitle: boolean = true;
  @Input() SubFoodditName: string;
  isPageLoaded: boolean = false;

  constructor(
    private recipeService: RecipesService,
    private route: ActivatedRoute,
    private subfoodditService: SubfoodditService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isPageLoaded = false;

    if (this.SubFoodditName) {
      this.route.params.subscribe((params: any) => {
        if (params) {
          this.initNewSubF();
        }
      });
    } else {
      this.recipeService.getRecipes().subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
          this.recipes.sort((a, b) =>
            a.aggregatedVotes > b.aggregatedVotes ? -1 : 1
          );
          this.isPageLoaded = true;
        },
        error => {
          console.error('Error fetching recipes: ', error);
          this.isPageLoaded = true;
        }
      );
    }
  }

  initNewSubF() {
    this.subfoodditService.getSubfooddits().subscribe((resp: Subfooddit[]) => {
      const subFooditId = resp.find(
        (sf: Subfooddit) =>
          sf.title.toLowerCase() === this.SubFoodditName.toLowerCase()
      )?.subfoodditId;
      this.recipeService
        .getRecipesBySubfoodditId(subFooditId ? subFooditId : 0)
        .subscribe(
          (recipes: Recipe[]) => {
            this.recipes = recipes;
            this.isPageLoaded = true;
            this.recipes.sort((a, b) =>
              a.aggregatedVotes > b.aggregatedVotes ? -1 : 1
            );
          },
          error => {
            console.error('Error fetching recipes: ', error);
            this.isPageLoaded = true;
          }
        );
    });
  }

  selectChange(event: any) {
    switch (event.target.value) {
      case 'Best': {
        this.recipes.sort((a, b) =>
          a.aggregatedVotes > b.aggregatedVotes ? -1 : 1
        );

        break;
      }
      case 'Newest': {
        this.recipes.sort((a, b) => (a.datePosted > b.datePosted ? -1 : 1));

        break;
      }
    }
  }

  navigateToCreate() {
    this.router.navigate(['/create']);
  }
}
