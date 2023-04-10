import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ILoginData } from '@flying-pizza/model'
import { AuthService } from '@flying-pizza/shared-services';

@Component({
  selector: 'fp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup | undefined;
  captchaResolved: boolean = false;

  constructor(private fb: FormBuilder, private readonly router: Router, private readonly auth: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    const loginData: ILoginData = this.form?.value;
    this.auth
      .login(loginData)
      .then(() => this.router.navigate(['/company']))
      .catch((e) => console.log(e.message));
  }

  loginWithGoogle(): void {
    this.auth
      .loginWithGoogle()
      .then(() => this.router.navigate(['/company']))
      .catch((e) => console.log(e.message));
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

  get email() {
    return this.form?.get('email');
  }

  get password() {
    return this.form?.get('password');
  }
}
