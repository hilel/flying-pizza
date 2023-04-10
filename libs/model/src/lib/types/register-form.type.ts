import { FormControl } from "@angular/forms";

import { GenderType } from "./gender.type";

export type RegisterFormType = {
    email: FormControl<string | null | null>;
    firstName: FormControl<string | null>;
    lastName: FormControl<string | null>;
    birthDate: FormControl<Date | null>;
    gender: FormControl<GenderType | null>;
    password: FormControl<string | null>;
    confirmPassword: FormControl<string | null>;
    bio?: FormControl<string | null>
};