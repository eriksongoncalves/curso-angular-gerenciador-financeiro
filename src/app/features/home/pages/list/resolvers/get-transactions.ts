import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';

import { TransactionsService } from '../../../../../shared/transaction/services/transactions';
import { Transaction } from '../../../../../shared/transaction/interfaces/transaction';

export const getTransactionsResolver: ResolveFn<Observable<Transaction[]>> = () => {
  const transactionsService = inject(TransactionsService);

  return transactionsService.getAll();
};
