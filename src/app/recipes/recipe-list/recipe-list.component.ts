import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css'],
    imports: [RecipeItemComponent], // No standalone components in this file
    standalone: true
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  recipeService = inject(RecipeService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
