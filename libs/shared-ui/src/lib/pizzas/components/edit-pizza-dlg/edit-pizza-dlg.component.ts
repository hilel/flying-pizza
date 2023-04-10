import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IPizzaItem, PizzaItemFormType } from '@flying-pizza/model';

export interface IEditPizzaDlgData {
  pizza?: IPizzaItem;
}

@Component({
  selector: 'fp-edit-pizza-dlg',
  templateUrl: './edit-pizza-dlg.component.html',
  styleUrls: ['./edit-pizza-dlg.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatDialogModule
  ]
})
export class EditPizzaDlgComponent {
  pizzaForm: FormGroup<PizzaItemFormType>;

  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dlgRef: MatDialogRef<EditPizzaDlgComponent, IPizzaItem>,
    @Inject(MAT_DIALOG_DATA) private dlgData: IEditPizzaDlgData
  ) {
    this.isEdit = !!this.dlgData.pizza?.id;
    this.pizzaForm = this._buildForm(this.dlgData.pizza);
  }

  onSubmit(): void {
    if (this.pizzaForm.valid) {
      const passedPizza: IPizzaItem = this.dlgData.pizza || {} as IPizzaItem;
      const formVal = this.pizzaForm.value;
      let pizzaItem: IPizzaItem = {
        name: formVal.name || passedPizza.name || '',
        description: formVal.description || passedPizza.description || '',
        price: parseInt(formVal.price + '') || passedPizza.price || 0
      };
      if (this.isEdit) {
        pizzaItem.id = passedPizza.id;
      }
      // TODO: make request in dialog to close it only if succeed, if failed show validation msg
      this.dlgRef.close(pizzaItem);
    }
  }

  private _buildForm(editPizzaItem?: IPizzaItem): FormGroup<PizzaItemFormType> {
    return this.fb.group<PizzaItemFormType>({
      name: new FormControl(editPizzaItem?.name || '', [Validators.required, Validators.maxLength(100)]),
      description: new FormControl(editPizzaItem?.description || '', [Validators.required, Validators.maxLength(10000)]),
      price: new FormControl(editPizzaItem?.price || null, [Validators.required, Validators.min(1), Validators.max(1000000)])
    });
  }
}
