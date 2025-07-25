import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  inject
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.scss'],
    imports: [FormsModule],
    standalone: true
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm|undefined;
  subscription: Subscription | undefined;
  editMode = false;
  editedItemIndex: number|undefined;
  editedItem: Ingredient|undefined;

  slService = inject(ShoppingListService);


  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm?.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    console.log('Form submitted:', form);
    
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex ?? -1, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm?.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex || -1);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
