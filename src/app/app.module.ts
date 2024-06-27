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
import { A11yModule } from '@angular/cdk/a11y';
import { ToastrModule } from 'ngx-toastr';
import { CreateSubfoodditComponent } from './subfooddit/create-subfooddit/create-subfooddit.component';
import { MobileMenuOverlayComponent } from './navigation/mobile-menu-overlay/mobile-menu-overlay.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

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
    CreateSubfoodditComponent,
    MobileMenuOverlayComponent,
  ],
  // TODO: Split app to separate modules (like in user-page) and -
  //  - split theese imports between them.
  imports: [
    SearchBarComponent,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    A11yModule,
    MatMenuModule,
    MatButtonModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
