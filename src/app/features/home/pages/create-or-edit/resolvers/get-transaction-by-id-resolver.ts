import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';

import { TransactionsService } from '../../../../../shared/transaction/services/transactions';
import { Transaction } from '../../../../../shared/transaction/interfaces/transaction';

export const getTransactionByIdResolver: ResolveFn<Observable<Transaction>> = (route) => {
  const transactionsService = inject(TransactionsService);

  const transactionId = route.paramMap.get('id');

  return transactionsService.getById(transactionId!);
};
