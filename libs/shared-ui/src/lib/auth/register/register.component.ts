import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { GenderType, IRegisterData, RegisterFormType } from '@flying-pizza/model';
import { AuthService } from '@flying-pizza/shared-services';
// import { AuthService } from '@flying-pizza/shared-services';

@Component({
  selector: 'fp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: FormGroup<RegisterFormType> = this._buildForm();
  captchaResolved: boolean = false;
  minDate: Date;
  maxDate: Date;
  MINIMUM_AGE: number = 16;

  constructor(private fb: FormBuilder, private readonly router: Router, private readonly auth: AuthService) {
    const currentDate = new Date();
    this.minDate = new Date(currentDate.getFullYear() - 100, 1, 1);
    this.maxDate = new Date(
      currentDate.getFullYear() - this.MINIMUM_AGE, currentDate.getMonth(), currentDate.getDate()
    );
  }

  ngOnInit(): void {}

  register(): void {
    const registerData = this.form?.value as IRegisterData;
    this.auth.register(registerData).subscribe({
      next: () => this.router.navigate(['/pizzas']),
      error: (e) => console.log(e.message)
    });
  }

  resolved(captchaResponse: string): void {
    // console.log(`Resolved captcha with response: ${captchaResponse}`);
    if (captchaResponse) {
      this.captchaResolved = true;
    }
  }

  errored(event: any): void {
    console.warn(`reCAPTCHA error encountered`, event);
  }

  private _buildForm(): FormGroup<RegisterFormType> {
    return this.fb.group<RegisterFormType>({
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      birthDate: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }
}
