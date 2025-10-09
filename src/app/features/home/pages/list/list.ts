import { Component, inject, input, linkedSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { switchMap } from 'rxjs';

import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { NoTransactions } from './components/no-transactions/no-transactions';
import { TransactionsContainer } from './components/transactions-container/transactions-container';

import { TransactionsService } from '../../../../shared/transaction/services/transactions';
import { FeedbackService } from '../../../../shared/transaction/services/feedback';
import { ConfirmationDialogService } from '../../../../shared/dialog/confirmation/services/confirmation-dialog';
import { Transaction } from '../../../../shared/transaction/interfaces/transaction';

@Component({
  selector: 'app-list',
  imports: [
    Balance,
    TransactionItem,
    NoTransactions,
    MatButtonModule,
    RouterLink,
    TransactionsContainer,
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  transactions = input.required<Transaction[]>();

  items = linkedSignal(() => this.transactions());

  private readonly _router = inject(Router);
  private readonly _transactionService = inject(TransactionsService);
  private readonly _feedbackService = inject(FeedbackService);
  private readonly _confirmationDialogService = inject(ConfirmationDialogService);

  edit(transactionId: number): void {
    this._router.navigate(['edit', transactionId]);
  }

  remove(transactionId: number): void {
    this._confirmationDialogService
      .open({
        title: 'Deletar transação',
        message: 'Você realmente quer deletar a transação?',
        noBtnText: 'Não',
        yesBtnText: 'Sim',
      })
      .pipe(switchMap(() => this._transactionService.delete(transactionId)))
      .subscribe({
        next: () => {
          this.items.update((transactions) =>
            transactions.filter((transaction) => transaction.id !== transactionId),
          );

          this._feedbackService.success('Transação removida com sucesso!');
          this._router.navigate(['/']);
        },
        error: (error) => console.log('ERROR >>> ', error),
      });
  }
}
