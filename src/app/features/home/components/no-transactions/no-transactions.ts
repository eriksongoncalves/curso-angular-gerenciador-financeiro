import { Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-no-transactions',
  imports: [MatCard, MatCardContent],
  templateUrl: './no-transactions.html',
  styleUrl: './no-transactions.scss',
})
export class NoTransactions {}
