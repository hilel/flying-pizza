import { Global, Module, DynamicModule, Logger } from '@nestjs/common';
import { FirebaseAdminModuleAsyncOptions } from './firebase-admin.interface';
import {
  FIREBASE_ADMIN_MODULE_OPTIONS,
  FIREBASE_ADMIN_INJECT,
} from './firebase-admin.constant';
import * as admin from 'firebase-admin';
import { fbConfig } from '@flying-pizza/firebase-api';

@Global()
@Module({})
export class FirebaseAdminModule {
  static forRoot(options: admin.AppOptions): DynamicModule {
    const firebaseAdminModuleOptions = {
      provide: FIREBASE_ADMIN_MODULE_OPTIONS,
      useValue: options,
    };

    const app =
      admin.apps.length === 0 ? admin.initializeApp(fbConfig) : admin.apps[0];

    Logger.log(fbConfig);

    const firebaseAuthencationProvider = {
      provide: FIREBASE_ADMIN_INJECT,
      useValue: app,
    };

    return {
      module: FirebaseAdminModule,
      providers: [firebaseAdminModuleOptions, firebaseAuthencationProvider],
      exports: [firebaseAdminModuleOptions, firebaseAuthencationProvider],
    };
  }

  static forRootAsync(options: FirebaseAdminModuleAsyncOptions): DynamicModule {
    const firebaseAdminModuleOptions = {
      provide: FIREBASE_ADMIN_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };

    const firebaseAuthencationProvider = {
      provide: FIREBASE_ADMIN_INJECT,
      useFactory: (opt: admin.AppOptions) => {
        opt.projectId = fbConfig.project_id;
        opt.credential = admin.credential.cert(fbConfig);
        Logger.log(opt);
        const app =
          admin.apps.length === 0 ? admin.initializeApp(opt) : admin.apps[0];

        return app;
      },
      inject: [FIREBASE_ADMIN_MODULE_OPTIONS],
    };

    return {
      module: FirebaseAdminModule,
      imports: options.imports,
      providers: [firebaseAdminModuleOptions, firebaseAuthencationProvider],
      exports: [firebaseAdminModuleOptions, firebaseAuthencationProvider],
    };
  }
}
