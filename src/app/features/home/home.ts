import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';

import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { NoTransactions } from './components/no-transactions/no-transactions';
import { Transaction } from '../../shared/transaction/interfaces/transaction';
import { TransactionsService } from '../../shared/transaction/services/transactions';

@Component({
  selector: 'app-home',
  imports: [Balance, TransactionItem, NoTransactions],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private readonly _transactionService = inject(TransactionsService);

  transactions = signal<Transaction[]>([]);

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(): void {
    this._transactionService
      .getAll()
      .pipe(take(1))
      .subscribe({
        next: (transactions) => {
          this.transactions.set(transactions);
        },
      });
  }
}
