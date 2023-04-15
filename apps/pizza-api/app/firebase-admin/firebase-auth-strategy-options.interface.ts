import { JwtFromRequestFunction } from 'passport-jwt';

export interface IFirebaseAuthStrategyOptions {
  extractor: JwtFromRequestFunction;
  checkRevoked?: boolean;
}