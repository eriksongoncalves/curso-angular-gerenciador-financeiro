import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Layout } from '../layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'login',
        component: Login,
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];
