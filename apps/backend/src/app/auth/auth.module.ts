import { Logger, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseAuthStrategy } from '../firebase/firebase-auth.strategy';
import { FirebaseAuthGuard } from '../guards/firebase-auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'firebase-auth' })
  ],
  providers: [
    FirebaseAuthGuard,
    { provide: FirebaseAuthStrategy, useValue: new FirebaseAuthStrategy() }
  ],
  exports: [
    PassportModule
  ]
})
export class AuthModule {}
