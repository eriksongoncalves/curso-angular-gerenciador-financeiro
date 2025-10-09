import { Routes } from '@angular/router';

import { CreateOrEdit } from './pages/create-or-edit/create-or-edit';
import { getTransactionByIdResolver } from './pages/create-or-edit/resolvers/get-transaction-by-id-resolver';
import { List } from './pages/list/list';
import { getTransactionsResolver } from './pages/list/resolvers/get-transactions';

export const routes: Routes = [
  {
    path: '',
    component: List,
    resolve: { transactions: getTransactionsResolver },
  },
  {
    path: 'create',
    component: CreateOrEdit,
  },
  {
    path: 'edit/:id',
    component: CreateOrEdit,
    resolve: { transaction: getTransactionByIdResolver },
  },
];
