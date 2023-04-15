import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseAuthStrategy } from '../firebase/firebase-auth.strategy';
import { FirebaseAuthGuard } from '../guards/firebase-auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'firebase-jwt' })
  ],
  providers: [
    FirebaseAuthStrategy, FirebaseAuthGuard
  ],
  exports: [
    PassportModule
  ]
})
export class AuthModule {}
