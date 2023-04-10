import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { RecaptchaModule, RECAPTCHA_LANGUAGE } from 'ng-recaptcha'

import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { AuthContactBoxComponent } from './components/auth-contact-box.component';

const authRoutes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'prefix', },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthComponent, AuthContactBoxComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    
    MatIconModule,
    MatDividerModule,
    RecaptchaModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    {
      provide: RECAPTCHA_LANGUAGE,
      useFactory: (locale: string) => { return locale; }, deps: [LOCALE_ID]
    }
  ]
})
export class AuthModule {}
