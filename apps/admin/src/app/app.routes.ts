import { Route } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { MainLayoutComponent } from 'libs/shared-ui/src/lib/modules/layout/main-layout/main-layout.component';
import { CleanLayoutComponent } from 'libs/shared-ui/src/lib/modules/layout/clean-layout/clean-layout.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['pizzas', 'list']);

export const appRoutes: Route[] = [
    { path: '', redirectTo: '/pizzas/list' , pathMatch: 'full' },
    { 
        path: '',
        component: MainLayoutComponent,
        ...canActivate(redirectUnauthorizedToLogin),
        children: [
            {
                path: 'pizzas',
                loadChildren: () => import('@flying-pizza/shared-ui').then((m) => m.PizzasModule)
            }
        ]
    },
    {
        path: '',
        component: CleanLayoutComponent,
        ...canActivate(redirectLoggedInToHome),
        children: [
            {
                path: 'auth',
                loadChildren: () => import('@flying-pizza/shared-ui').then((m) => m.AuthModule)
            }
        ]
    },
    // redirect to home
    { path: '**', redirectTo: '/pizzas/list' }
];

