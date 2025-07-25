import { EventEmitter, Output } from "@angular/core";
import { Ingredient } from "../shared/ingredient";


export class ShoppingListService {

    itemAdded = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
        new Ingredient('Bananas', 3)
    ];

    constructor() {}

    getIngredients(): Ingredient[] {
        return this.ingredients.slice(); // Return a copy of the ingredients array
    }

    addIngredient(ingredient: Ingredient, emit?: boolean): void {
        if (this.ingredients.some(ing => ing.name === ingredient.name)) {
            // If the ingredient already exists, update its quantity
            const existingIngredient = this.ingredients.find(ing => ing.name === ingredient.name);
            if (existingIngredient) {
                existingIngredient.amount += ingredient.amount; // Update the amount
            }
        } else {
            this.ingredients.push(ingredient);
        }
        if (emit !== false) { // Emit the event unless explicitly set to false
            this.itemAdded.emit(this.ingredients.slice()); // Emit a copy of the updated ingredients list
        }
    }

    addIngredients(ingredients: Ingredient[]): void {
        for (const ingredient of ingredients) {
            this.addIngredient(ingredient); // Use the existing method to handle duplicates
        }

        this.itemAdded.emit(this.ingredients.slice()); // Emit a copy of the updated ingredients list
    }

    updateIngredient(index: number, newIngredient: Ingredient): void {
        this.ingredients[index] = newIngredient;
    }

    deleteIngredient(index: number): void {
        this.ingredients.splice(index, 1);
    }

}