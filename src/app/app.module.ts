import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
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
    SubfoodditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent, RecipePageComponent]
})
export class AppModule {}
