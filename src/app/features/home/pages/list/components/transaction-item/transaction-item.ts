import { Component, input, output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

import { TransactionValue } from './transaction-value/transaction-value';
import { Transaction } from '../../../../../../shared/transaction/interfaces/transaction';
import { CustomColorDirective } from '../../../../../../shared/material/buttons/directives/custom-color';
import { IsIncomeDirective } from './directives/is-income';

@Component({
  selector: 'app-transaction-item',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    TransactionValue,
    CustomColorDirective,
    IsIncomeDirective,
  ],
  templateUrl: './transaction-item.html',
  styleUrl: './transaction-item.scss',
})
export class TransactionItem {
  transaction = input.required<Transaction>();

  edit = output<number>();
  remove = output<number>();
}
