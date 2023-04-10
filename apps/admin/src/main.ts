import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

// below code is for standalone components:
// import { bootstrapApplication } from '@angular/platform-browser';
// import {
//   provideRouter,
//   withEnabledBlockingInitialNavigation,
// } from '@angular/router';
// import { appRoutes } from './app/app.routes';
// import { AppComponent } from './app/app.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { importProvidersFrom } from '@angular/core';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
//     importProvidersFrom(BrowserAnimationsModule, BrowserAnimationsModule)
//   ],
// }).catch((err) => console.error(err));
