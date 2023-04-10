import {
    Auth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    authState,
    UserCredential,
    User,
  } from '@angular/fire/auth';
  
import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ILoginData, IRegisterData } from '@flying-pizza/model';
  
  @Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    constructor(private http: HttpClient, private auth: Auth) {}
  
    login({ email, password }: ILoginData): Promise<UserCredential> {
      return signInWithEmailAndPassword(this.auth, email, password);
    }
  
    loginWithGoogle(): Promise<UserCredential> {
      return signInWithPopup(this.auth, new GoogleAuthProvider());
    }
  
    register(registerData: IRegisterData): Observable<UserCredential> {
      const url = `/api/signup`;
      return this.http.post<UserCredential>(url, registerData)
        .pipe(
          // TODO: add catchError operator and maybe in other places
          switchMap((u) =>
            this.login({ email: registerData.email, password: registerData.password })
          )
        );
    }
  
    logout(): Promise<void> {
      return signOut(this.auth);
    }

    getAuthUser(): Observable<User | null> {
        return authState(this.auth);
    }
  }