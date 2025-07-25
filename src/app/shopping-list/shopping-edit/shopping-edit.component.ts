import {
    Component,
    ElementRef,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
    @ViewChild('nameInput') nameInput: ElementRef | undefined;
    @ViewChild('amountInput') amountInput: ElementRef | undefined;

    @Output('itemAdded') itemAdded = new EventEmitter<Ingredient>();

    constructor() {}

    ngOnInit(): void {}

    onAddIngredient() {
        console.log('Adding ingredient...');
        console.log('Name Input:', this.nameInput);
        console.log('Amount Input:', this.amountInput);
        const name = this.nameInput?.nativeElement.value.trim();
        const amount = +this.amountInput?.nativeElement.value;

        if (name && amount > 0) {
            const newIngredient = new Ingredient(name, amount);
            this.itemAdded.emit(newIngredient);
        } else {
            console.error('Invalid ingredient name or amount');
        }
    }
}
