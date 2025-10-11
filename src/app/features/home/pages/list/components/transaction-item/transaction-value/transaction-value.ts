import { Component, computed, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { TransactionType } from '../../../../../../../shared/transaction/enums/transaction-type';
import { Transaction } from '../../../../../../../shared/transaction/interfaces/transaction';

const CssClasses = {
  [TransactionType.INCOME]: 'income',
  [TransactionType.OUTCOME]: 'outcome',
};

@Component({
  selector: 'app-transaction-value',
  imports: [CurrencyPipe],
  styleUrl: './transaction-value.scss',
  host: {
    '[class]': 'cssClass()',
  },
  template: `{{ transaction().value | currency: 'BRL' }}`,
})
export class TransactionValue {
  transaction = input.required<Transaction>();

  cssClass = computed(() => CssClasses[this.transaction().type]);
}
