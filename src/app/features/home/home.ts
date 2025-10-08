import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { take } from 'rxjs';

import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { NoTransactions } from './components/no-transactions/no-transactions';
import { Transaction } from '../../shared/transaction/interfaces/transaction';
import { TransactionsService } from '../../shared/transaction/services/transactions';

@Component({
  selector: 'app-home',
  imports: [Balance, TransactionItem, NoTransactions, MatButtonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  transactions = signal<Transaction[]>([]);

  private readonly _transactionService = inject(TransactionsService);
  private readonly _router = inject(Router);

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

  edit(transactionId: number): void {
    this._router.navigate(['edit', transactionId]);
  }
}
