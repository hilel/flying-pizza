import { Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, JwtFromRequestFunction } from 'passport-jwt';
import { Strategy } from 'passport-strategy';
import {  } from "passport-jwt";
import { Request } from 'express';
import { IFirebaseAuthStrategyOptions } from './firebase-auth-strategy-options.interface';
import { UNAUTHORIZED, FIREBASE_AUTH } from './firebase-consts';
import { FirebaseUser } from './firebase-user.type';
import * as admin from 'firebase-admin';

import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-custom';
// import * as admin from 'firebase-admin';

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

  // async validate(req: Request): Promise<any> {
  //   if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
  //     throw new UnauthorizedException('Unauthorized');
  //   }

  //   const idToken = req.headers.authorization.split('Bearer ')[1];

  //   try {
  //     const decodedToken = await admin.auth().verifyIdToken(idToken);
  //     return decodedToken;
  //   } catch (error) {
  //     console.error('Error while verifying token:', error);
  //     throw new UnauthorizedException('Unauthorized');
  //   }
  // }
    async validate(payload: FirebaseUser): Promise<any> {
      // debugger;
      return payload;
    }

    authenticate(req: Request): void {
      // debugger;
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


// export class FirebaseAuthStrategy extends PassportStrategy(Strategy, 'firebase-auth') {
//   readonly name = FIREBASE_AUTH;
//   private checkRevoked = false;
//   private extractor: JwtFromRequestFunction;

//   constructor(
//     options: IFirebaseAuthStrategyOptions = {
//       checkRevoked: true,
//       extractor: ExtractJwt.fromHeader('Authorization')
//     },
//     private logger = new Logger(FirebaseAuthStrategy.name),
//   ) {
//     super();

//     if (!options.extractor) {
//       throw new Error(
//         '\n Extractor is not a function. You should provide an extractor. \n Read the docs: https://github.com/tfarras/nestjs-firebase-auth#readme',
//       );
//     }

//     this.extractor = options.extractor;
//     this.checkRevoked = options.checkRevoked;
//   }

//   async validate(payload: FirebaseUser): Promise<any> {
//     return payload;
//   }

//   authenticate(req: Request): void {
//     const idToken = this.extractor(req);

//     if (!idToken) {
//       this.fail(UNAUTHORIZED, 401);

//       return;
//     }

//     try {
//       admin
//         .auth()
//         .verifyIdToken(idToken, this.checkRevoked)
//         .then((res) => this.validateDecodedIdToken(res))
//         .catch((err) => {
//           this.fail({ err }, 401);
//         });
//     } catch (e) {
//       this.logger.error(e);

//       this.fail(e, 401);
//     }
//   }

//   private async validateDecodedIdToken(decodedIdToken: FirebaseUser) {
//     const result = await this.validate(decodedIdToken);

//     if (result) {
//       this.success(result);
//     }

//     this.fail(UNAUTHORIZED, 401);
//   }
// }