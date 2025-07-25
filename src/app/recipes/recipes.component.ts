import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  providers: [RecipeService] // Add any providers if needed
})
export class RecipesComponent implements OnInit, OnDestroy {

    recipe: Recipe | undefined;
    recipeSelected$: Subscription = undefined!;
  
    constructor(private recipeService: RecipeService) { }
    
    ngOnInit(): void {
      this.recipeSelected$ = this.recipeService.recipeSelected.subscribe(x => this.recipe = x);
    }

    ngOnDestroy(): void {
        if (this.recipeSelected$) {
            this.recipeSelected$.unsubscribe();
        }
    }
}
