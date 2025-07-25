import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  @Input('recipe')
  recipe: Recipe | undefined;

  dropdownOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleDropdown(event: MouseEvent) {
    event.preventDefault();
    this.dropdownOpen = !this.dropdownOpen;
  }

}
