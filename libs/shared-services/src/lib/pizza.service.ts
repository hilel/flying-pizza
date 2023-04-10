import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

import { IPizzaItem } from '@flying-pizza/model';
  
  @Injectable({
    providedIn: 'root',
  })
  export class PizzaService {
    constructor(private http: HttpClient, private store: Firestore) {}

    getPizzasRef(): Observable<IPizzaItem[]> {
      const coll = collection(this.store, 'pizzas');
      return collectionData(coll, { idField: 'id' }) as Observable<IPizzaItem[]>;
    }
  
    createPizza(newPizza: IPizzaItem): Observable<string> {
      const url = `/api/pizzas`;
      return this.http.post<string>(url, newPizza);
    }

    updatePizza(editPizza: IPizzaItem): Observable<string> {
      const url = `/api/pizzas/${editPizza.id}`;
      return this.http.patch<string>(url, editPizza);
    }
  }