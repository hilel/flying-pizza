import { SignupApiErrorsType, LoginApiErrorsType, PizzaApiErrosType } from '@flying-pizza/model';

const isEmail = (email: string): boolean => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

const isEmpty = (someVal: string): boolean => {
  if (!someVal) {
    return true;
  } else if (typeof someVal === 'string' && someVal.trim() === '') {
    return true;
  }
  return false;
};

const isNegativeOrZeroNumber = (someVal: number): boolean => {
  if (!someVal || typeof someVal !== 'number' || someVal <= 0) {
    return true;
  }
  return false;
}

// TODO use types
export const validateSignupData = (data: any): any => {
  let errors: SignupApiErrorsType = {};

  if (isEmpty(data.email)) {
    errors.email = 'Must not be empty';
  } else if (!isEmail(data.email)) {
    errors.email = 'Must be a valid email address';
  }

  if (isEmpty(data.password)) errors.password = 'Must not be empty';
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = 'Passwords must match';
  // if (isEmpty(data.handle)) errors.handle = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

// TODO use types
export const validateLoginData = (data: any): any => {
  let errors: LoginApiErrorsType = {};

  if (isEmpty(data.email)) errors.email = 'Must not be empty';
  if (isEmpty(data.password)) errors.password = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

// TODO use types
export const reduceUserDetails = (data: any): any => {
  let userDetails: any = {};

  if (!isEmpty(data.bio?.trim())) userDetails.bio = data.bio;
  if (!isEmpty(data.website?.trim())) {
    // https://website.com
    if (data.website.trim().substring(0, 4) !== 'http') {
      userDetails.website = `http://${data.website.trim()}`;
    } else userDetails.website = data.website;
  }
  if (!isEmpty(data.location?.trim())) userDetails.location = data.location;

  return userDetails;
};

// TODO use types
export const validatePizzaData = (data: any, checkId: boolean = false): any => {
  let errors: PizzaApiErrosType = {};

  if (checkId && isEmpty(data.id)) errors.id = 'Must not be empty';

  if (isEmpty(data.name)) errors.name = 'Must not be empty';

  if (isEmpty(data.description)) errors.description = 'Must not be empty';

  if (isNegativeOrZeroNumber(data.price)) errors.price = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
}
  