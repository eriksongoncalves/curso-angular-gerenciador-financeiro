import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/routes').then((m) => m.routes),
    //loadChildren: () => import('./features/home/routes') se o routes estivesse com export default
  },
];
