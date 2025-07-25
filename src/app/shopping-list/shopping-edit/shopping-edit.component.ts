import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient';
import { ShoppingListService } from '../shopping-list.service';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
    @ViewChild('nameInput') nameInput: ElementRef | undefined;
    @ViewChild('amountInput') amountInput: ElementRef | undefined;

    constructor(private shoppingListService: ShoppingListService) {}

    ngOnInit(): void {}

    onAddIngredient() {
        const name = this.nameInput?.nativeElement.value.trim();
        const amount = +this.amountInput?.nativeElement.value;

        if (name && amount > 0) {
            this.shoppingListService.addIngredient(new Ingredient(name, amount));
        } else {
            console.error('Invalid ingredient name or amount');
        }
    }
}
