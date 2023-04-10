export type LoginApiErrorsType = {
  email?: string;
  password?: string;
}

export type SignupApiErrorsType = {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export type PizzaApiErrosType = {
  id?: string;
  name?: string;
  description?: string;
  price?: string;
}