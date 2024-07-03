import { Component, Input, OnInit, effect, input, signal } from '@angular/core';
import { Recipe } from '../../Models/Recipe.model';
import { RecipesService } from '../../Services/recipes.service';
import { SubfoodditService } from '../../Services/subfooddit.service';
import { Subfooddit } from '../../Models/Subfooddit.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  notShowTitle = input<boolean>();
  @Input({required: true}) SubFoodditName: string;
  isPageLoaded: boolean = false;
  selectedValue = signal<'Best' | 'Newest'>('Best');


  constructor(
    private recipeService: RecipesService,
    private route: ActivatedRoute,
    private subfoodditService: SubfoodditService,
  ) {
    effect(() => {
      this.sortRecipes(this.selectedValue());
    });
  }

  ngOnInit(): void {
    this.isPageLoaded = false;

    if (this.SubFoodditName) {
      this.route.params.subscribe((params: Params) => {
        if (params) {
          this.initNewSubF();
        }
      });
    } else {
      this.recipeService.getRecipes().subscribe({
        next: (recipes: Recipe[]) => {
          this.selectedValue.set('Best');
          this.recipes = recipes;
          this.sortRecipes();
        },
        error: (error) => {
          console.error('Error fetching recipes: ', error);
        },
        complete: () => {
          this.isPageLoaded = true;
        }
      });
    }
  }

  private initNewSubF() {
    this.subfoodditService.getSubfooddits().subscribe((resp: Subfooddit[]) => {
      const subFooditId = resp.find(
        (sf: Subfooddit) =>
          sf.title.toLowerCase() === this.SubFoodditName.toLowerCase()
      )?.subfoodditId;
      this.recipeService
        .getRecipesBySubfoodditId(subFooditId ? subFooditId : 0)
        .subscribe({
          next: (recipes: Recipe[]) => {
            this.recipes = recipes;
            this.sortRecipes();
          },
          error: (error) => {
            console.error('Error fetching recipes: ', error);
          },
          complete: () => {
            this.isPageLoaded = true;
          }
        });
    });
  }

  public sortRecipes(filterValue?: string) {
    switch (filterValue ? filterValue : this.selectedValue()) {
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
}
