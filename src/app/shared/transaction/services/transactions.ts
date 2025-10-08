import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Transaction, TransactionPayload } from '../interfaces/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private readonly _httpClient = inject(HttpClient);

  getAll(): Observable<Transaction[]> {
    return this._httpClient.get<Transaction[]>('http://localhost:3000/transactions');
  }

  create(payload: TransactionPayload): Observable<Transaction> {
    return this._httpClient.post<Transaction>('http://localhost:3000/transactions', payload);
  }
}
