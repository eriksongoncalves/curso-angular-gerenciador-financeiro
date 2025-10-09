import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/layout/layout').then((c) => c.Layout),
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
