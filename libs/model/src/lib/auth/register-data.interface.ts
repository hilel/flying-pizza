import { GenderType } from '../types';

export interface IRegisterData {
    email: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: GenderType;
    password: string;
    confirmPassword: string;
    bio?: string;
}