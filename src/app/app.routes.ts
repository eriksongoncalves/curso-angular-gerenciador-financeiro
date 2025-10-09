import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './core/auth/guards/is-authenticated-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/layout/layout').then((c) => c.Layout),
    canActivate: [isAuthenticatedGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/routes').then((m) => m.routes),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/routes').then((m) => m.routes),
    //loadChildren: () => import('./features/home/routes') se o routes estivesse com export default
  },
];
