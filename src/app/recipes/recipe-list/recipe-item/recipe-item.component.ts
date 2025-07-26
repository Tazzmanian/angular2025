import { Component, OnInit, input } from '@angular/core';

import { Recipe } from '../../recipe.model';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-recipe-item',
    templateUrl: './recipe-item.component.html',
    styleUrls: ['./recipe-item.component.css'],
    imports: [RouterLink],
    standalone: true
})
export class RecipeItemComponent implements OnInit {
  recipe = input<Recipe>();
  index = input<number>();

  ngOnInit() {
  }
}
