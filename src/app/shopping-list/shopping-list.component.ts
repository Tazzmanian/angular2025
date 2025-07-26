import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.scss'],
    imports: [ShoppingEditComponent],
    standalone: true
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  
    ingredients: Ingredient[] = [];
    ingredients$: Subscription = undefined!;

    shoppingListService = inject(ShoppingListService);
    
    ngOnInit(): void {
        this.ingredients = this.shoppingListService.getIngredients();

        this.ingredients$ = this.shoppingListService.itemAdded.subscribe(
            (ingredients: Ingredient[]) => {
                this.ingredients = ingredients;
            }
        );
    }
    
    addIngredient($event: Ingredient) {
        this.ingredients.push($event);
        console.log('Ingredient added:', $event);
        console.log('Current ingredients:', this.ingredients);
    }

    ngOnDestroy(): void {
        if (this.ingredients$) {
            this.ingredients$.unsubscribe();
        }
    }
}
