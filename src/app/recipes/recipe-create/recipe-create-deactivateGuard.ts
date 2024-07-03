import { CanDeactivateFn } from "@angular/router";
import { RecipeCreateComponent } from "./recipe-create.component";

export const canLeaveCreatePage: CanDeactivateFn<RecipeCreateComponent> = (component) =>{
    for (const key in component.newRecipe) {
      const touchedField = component.newRecipe[key as keyof typeof component.newRecipe]
      if(typeof touchedField == 'string' && touchedField){
        return window.confirm('Do you really want to leave? The Data you entered will not be saved.')
      }    
    }
  
    return true;
}