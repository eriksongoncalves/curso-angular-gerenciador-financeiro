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

  getById(id: string): Observable<Transaction> {
    return this._httpClient.get<Transaction>(`http://localhost:3000/transactions/${id}`);
  }

  create(payload: TransactionPayload): Observable<Transaction> {
    return this._httpClient.post<Transaction>('http://localhost:3000/transactions', payload);
  }

  edit(id: number, payload: TransactionPayload): Observable<Transaction> {
    return this._httpClient.put<Transaction>(`http://localhost:3000/transactions/${id}`, payload);
  }
}
