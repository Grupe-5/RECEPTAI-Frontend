import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipePageComponent } from './recipes/recipe-page/recipe-page.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'

const routes: Routes = [
  { path: 'recipe/:id', component: RecipePageComponent },
  { path: '**', component: RecipesComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, RouterOutlet, RouterLink, RouterLinkActive]
})
export class AppRoutingModule { }
