import { Logger, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PizzasModule } from './pizzas/pizzas.module';
import { UsersModule } from './users/users.module';
import { FirebaseAdminModule } from './firebase/firebase-admin.module';
import { credential } from 'firebase-admin'
// import { FirebaseAdminModule } from './firebase/firebase-admin.module';

@Module({
  imports: [
    FirebaseAdminModule.forRootAsync({
      // useFactory: (config: ConfigService) => config.get('firebase'),
      // inject: [ConfigService],
      useFactory: () => ({
        credential: credential.applicationDefault()
      })
    }),
    AuthModule,

    UsersModule,
    PizzasModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: Logger, useValue: new Logger('App') }
  ]
})
export class AppModule {}
