import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  @Input('recipe')
  recipe: Recipe | undefined;

  dropdownOpen = false;

  constructor(private rs: RecipeService) { }

  ngOnInit(): void {
  }

  // toggleDropdown(event: MouseEvent) {
  //   event.preventDefault();
  //   this.dropdownOpen = !this.dropdownOpen;
  // }

  addIngredients(ingrs: Recipe|undefined) {
    this.rs.updateShoppingList(ingrs?.ingredients || []);
  }

}
