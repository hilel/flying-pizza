import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, JwtFromRequestFunction } from 'passport-jwt';
import { Strategy } from 'passport-strategy';
import { Request } from 'express';
import * as admin from 'firebase-admin';
import { FirebaseUser } from './firebase-user.type';

import { IFirebaseAuthStrategyOptions } from './firebase-auth-strategy-options.interface';
import { UNAUTHORIZED, FIREBASE_AUTH } from './firebase-consts';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy, 'firebase-auth') {
  readonly name = FIREBASE_AUTH;
  private checkRevoked = false;
  private extractor: JwtFromRequestFunction = ExtractJwt.fromAuthHeaderAsBearerToken();
  private options: IFirebaseAuthStrategyOptions = {
    checkRevoked: true,
    extractor: this.extractor
  };
  private logger: Logger = new Logger(FirebaseAuthStrategy.name);

  constructor() {
    super();
    
    if (!this.options.extractor) {
      throw new Error(
        '\n Extractor is not a function. You should provide an extractor. \n Read the docs: https://github.com/tfarras/nestjs-firebase-auth#readme',
      );
    }
  }

  async validate(payload: FirebaseUser): Promise<any> {
    return payload;
  }

  authenticate(req: Request): void {
    const idToken = this.extractor(req);

    console.log(idToken);

    if (!idToken) {
      this.logger.error('Got no id token');
      this.fail(UNAUTHORIZED, 401);

      return;
    }

    try {
      admin
        .auth()
        .verifyIdToken(idToken, this.checkRevoked)
        .then((res) => this.validateDecodedIdToken(res))
        .catch((err) => {
          this.fail({ err }, 401);
        });
    } catch (e) {
      this.logger.error(e);

      this.fail(e, 401);
    }
  }

  private async validateDecodedIdToken(decodedIdToken: FirebaseUser) {
    const result = await this.validate(decodedIdToken);

    if (result) {
      this.success(result);
    }

    this.fail(UNAUTHORIZED, 401);
  }
}