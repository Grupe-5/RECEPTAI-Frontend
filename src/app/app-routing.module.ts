import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipePageComponent } from './recipes/recipe-page/recipe-page.component';
import { SubfoodditComponent } from './subfooddit/subfooddit.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { RecipeCreateComponent } from './recipes/recipe-create/recipe-create.component';
import { SignUpPageComponent } from './authPages/sign-up-page/sign-up-page.component';
import { SignInPageComponent } from './authPages/sign-in-page/sign-in-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { CreateSubfoodditComponent } from './subfooddit/create-subfooddit/create-subfooddit.component';
import { AuthGuard } from '../AuthGuards/auth.guard';
import { reverseAuthGuard } from '../AuthGuards/reverse-auth.guard';

const routes: Routes = [
  { path: 'recipe/:id', component: RecipePageComponent },
  { path: 'f/:subfoodit', component: SubfoodditComponent },
  {
    path: 'subf/create',
    component: CreateSubfoodditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create',
    component: RecipeCreateComponent,
    canActivate: [AuthGuard],
  },
  { path: 'register', component: SignUpPageComponent, canActivate: [reverseAuthGuard] },
  { path: 'sign-in', component: SignInPageComponent, canActivate: [reverseAuthGuard]},
  { path: 'user/:id', component: UserPageComponent },
  // TODO: Handle invalid routes
  { path: '', component: RecipesComponent },
  { path: '**', component: RecipesComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule, RouterOutlet, RouterLink, RouterLinkActive],
})
export class AppRoutingModule {}
