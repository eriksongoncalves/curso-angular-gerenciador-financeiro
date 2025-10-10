import { Component, input, output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { TransactionValue } from './transaction-value/transaction-value';
import { Transaction } from '../../../../../../shared/transaction/interfaces/transaction';
import { CustomColorDirective } from '../../../../../../shared/material/buttons/directives/custom-color';

@Component({
  selector: 'app-transaction-item',
  imports: [MatCardModule, MatButtonModule, TransactionValue, CustomColorDirective],
  templateUrl: './transaction-item.html',
  styleUrl: './transaction-item.scss',
})
export class TransactionItem {
  transaction = input.required<Transaction>();

  edit = output<number>();
  remove = output<number>();
}
