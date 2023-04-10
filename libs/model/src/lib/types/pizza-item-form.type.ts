import { FormControl } from "@angular/forms";

export type PizzaItemFormType = {
    name: FormControl<string | null | null>;
    description: FormControl<string | null>;
    price: FormControl<number | null>;
};