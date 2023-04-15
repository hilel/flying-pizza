/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import session from 'express-session';
import * as functions from 'firebase-functions';
import passport from 'passport';
import cors from 'cors';

const allowedOrigins = [
  'http://localhost:4200',
  'https://localhost:4200',
  'http://localhost:3333',
  'https://localhost:3333',
  'https://flying-pizzaa.web.app',
  '',
];

const server = express();

import { AppModule } from './app/app.module';
// import { FirebaseAuthStrategy } from './app/firebase/firebase-auth.strategy';
// import { FirebaseAuthGuard } from './app/guards/firebase-auth.guard';

const port = process.env.PORT || '3333';
Logger.log(port, 'Port');
let bootstrapDidRun = false;

export const bootstrapNestServer = async (expressInstance) => {
  bootstrapDidRun = true;
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance)
  );
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  // app.useGlobalGuards(new FirebaseAuthGuard(new Reflector()));
  // app.enableCors();
  // app.enableCors({
  //   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  //   preflightContinue: true,
  //   optionsSuccessStatus: 204,
  //   credentials: true,
  //   origin: allowedOrigins
  //   // origin: function (origin, callback) {
  //   //   Logger.log(origin, 'Origin');
  //   //   if (!origin || allowedOrigins.includes(origin)) {
  //   //     callback(null, true);
  //   //   } else {
  //   //     console.log('Not allowed by CORS: ', origin);
  //   //     callback(new Error("Not allowed by CORS"));
  //   //   }
  //   // }
  // });
  // app.use(session({ secret: 'SECRET' })); // session secret
  // app.use(passport.initialize());
  // app.use(passport.session());
  // debugger;
  // passport.use(new FirebaseAuthStrategy());
  (await (port === '3333')) ? app.listen(port) : Promise.resolve(true);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.log(process.env.NODE_ENV, 'process.env.NODE_ENV');
  return await app.init();
};

// bootstrapNestServer(server)
//     .then(v => console.log('Nest Ready'))
//     .catch(err => console.error('Nest broken', err));

// server.get('/', (req, res) => { res.send('🔥 Works ❤️‍🔥'); });
// server.get('/test', (req, res) => { res.send('🔥/test Works too ❤️‍🔥'); });

// Connect express server to Firebase Functions
export const api = functions
  .region('europe-west1')
  .https.onRequest(async (request, response) => {
    let app: INestApplication;
    try {
      app = await bootstrapNestServer(server);
      console.log('Nest Ready');
    } catch (err) {
      console.error('Nest broken', err);
    }

    server(request, response);
  });

const runBootstrapDev = async () => {
  if (port === '3333' && !bootstrapDidRun) {
    try {
      await bootstrapNestServer(server);
      console.log('Nest Ready');
    } catch (err) {
      console.error('Nest broken', err);
    }
  }
};

runBootstrapDev();
