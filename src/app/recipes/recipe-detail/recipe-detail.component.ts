import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe | undefined;

  dropdownOpen = false;

  constructor(private rs: RecipeService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.recipe = this.rs.getRecipe(params['name']);
    });
  }

  // toggleDropdown(event: MouseEvent) {
  //   event.preventDefault();
  //   this.dropdownOpen = !this.dropdownOpen;
  // }

  addIngredients(ingrs: Recipe|undefined) {
    this.rs.updateShoppingList(ingrs?.ingredients || []);
  }

  navigate() {
    if (this.recipe) {
      this.router.navigate(['edit'], { relativeTo: this.route });
    }
  }

}
