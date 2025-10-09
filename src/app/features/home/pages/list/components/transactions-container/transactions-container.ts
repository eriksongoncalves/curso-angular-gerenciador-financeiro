import { Component, contentChild, input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { Transaction } from '../../../../../../shared/transaction/interfaces/transaction';

@Component({
  selector: 'app-transactions-container',
  imports: [NgTemplateOutlet],
  templateUrl: './transactions-container.html',
  styleUrl: './transactions-container.scss',
})
export class TransactionsContainer {
  transactions = input.required<Transaction[]>();

  itemTemplate = contentChild.required<TemplateRef<unknown>>('item');

  noItemsTemplate = contentChild.required<TemplateRef<unknown>>('noItems');
}
