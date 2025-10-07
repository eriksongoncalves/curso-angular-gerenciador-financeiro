import { Component, signal } from '@angular/core';

import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { NoTransactions } from './components/no-transactions/no-transactions';
import { Transaction } from '../../shared/transaction/interfaces/transaction';

@Component({
  selector: 'app-home',
  imports: [Balance, TransactionItem, NoTransactions],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  transactions = signal<Transaction[]>([]);
}
