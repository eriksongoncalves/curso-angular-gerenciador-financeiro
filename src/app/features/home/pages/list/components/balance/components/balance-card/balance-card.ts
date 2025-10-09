import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

type BalanceCardType = 'income' | 'outcome' | 'balance';
type CssClass = 'income' | 'outcome' | 'zero';

@Component({
  selector: 'app-balance-card',
  imports: [MatCardModule],
  templateUrl: './balance-card.html',
  styleUrl: './balance-card.scss',
})
export class BalanceCard {
  type = input.required<BalanceCardType>();
  label = input.required<string>();
  amount = input.required<number>();

  cssClass = computed<CssClass>(() => {
    if (this.type() === 'balance') {
      if (this.amount() === 0) {
        return 'zero';
      }

      return this.amount() > 0 ? 'income' : 'outcome';
    }

    return this.type() as CssClass;
  });
}
