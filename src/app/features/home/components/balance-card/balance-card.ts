import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-balance-card',
  imports: [MatCardModule],
  templateUrl: './balance-card.html',
  styleUrl: './balance-card.scss',
})
export class BalanceCard {
  type = input.required<'income' | 'outcome' | 'balance'>();
  label = input.required<string>();
  amount = input.required<number>();

  cssClass = computed(() => {
    if (this.type() === 'balance') {
      return this.amount() > 0 ? 'income' : 'outcome';
    }

    return this.type();
  });
}
