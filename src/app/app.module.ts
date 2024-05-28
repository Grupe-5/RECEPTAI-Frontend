import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeCardComponent } from './recipes/recipe-card/recipe-card.component';
import { RecipePageComponent } from './recipes/recipe-page/recipe-page.component';
import { RecipeCreateComponent } from './recipes/recipe-create/recipe-create.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comments/comment/comment.component';
import { NavigationSidebarComponent } from './navigation/navigation-sidebar/navigation-sidebar.component';
import { SubfoodditComponent } from './subfooddit/subfooddit.component';
import { SignUpPageComponent } from './authPages/sign-up-page/sign-up-page.component';
import { SignInPageComponent } from './authPages/sign-in-page/sign-in-page.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SearchBarComponent } from './navigation/search-bar/search-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { A11yModule } from '@angular/cdk/a11y'

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RecipesComponent,
    RecipeCardComponent,
    RecipePageComponent,
    RecipeCreateComponent,
    CommentsComponent,
    CommentComponent,
    NavigationSidebarComponent,
    SubfoodditComponent,
    SignUpPageComponent,
    SignInPageComponent,
  ],
  imports: [
    SearchBarComponent,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    A11yModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent, RecipePageComponent],
})
export class AppModule {}
