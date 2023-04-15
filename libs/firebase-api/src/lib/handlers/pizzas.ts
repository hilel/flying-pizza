// import { db } from '../util/admin';
// import admin from 'firebase-admin';

// TODO make functions with Typescript to reuse models in BE
// const IPizzaItem = import('../../libs/models/src').IPizzaItem; 

// const config = require('../util/config');

import { getDb } from '../util/admin';
import { validatePizzaData } from '../util/validators';

// Get Pizzas
export const getAllPizzas = () => {

  return getDb().collection(`pizzas`).get()
    .then(
      (pizzasColl) => pizzasColl.docs.map((d) => d.data())
    )
    .catch((err) => {
      console.error(err);
      return { general: err.message };
    });
};

// Create Pizza
// TODO use types
export const createPizza = (newPizza: any): Promise<any> => {
  const { valid, errors } = validatePizzaData(newPizza);

  if (!valid) return Promise.resolve(errors);

  return getDb().collection('pizzas').add(newPizza).then((doc) => {
      return { id: doc.id };
    })
    .catch((err) => {
      console.error(err);
      return { general: err.message };
    });
};

// Update Pizza
// TODO use types
export const updatePizza = (editPizza: any) => {
  const { valid, errors } = validatePizzaData(editPizza, true);

  if (!valid) return Promise.resolve(errors);

  return getDb().doc(`pizzas/${editPizza.id}`).update(editPizza).then((doc) => {
      return { id: editPizza.id }; // { id: doc.id };
    })
    .catch((err) => {
      console.error(err);
      return { general: err.message };
    });
};