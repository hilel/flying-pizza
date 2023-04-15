import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseAdminModule } from './firebase/firebase-admin.module';
import { credential } from 'firebase-admin';
import { AuthModule } from './auth/auth.module';
import { PizzasModule } from './pizzas/pizzas.module';
import { UsersModule } from './users/users.module';

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
  providers: [AppService],
})
export class AppModule {}
