/* eslint-disable @angular-eslint/directive-selector */
import { Directive, inject, input, effect, TemplateRef, ViewContainerRef } from '@angular/core';
import { TransactionType } from '../../../../../../../shared/transaction/enums/transaction-type';

@Directive({
  selector: '[isIncome]',
})
export class IsIncomeDirective {
  private readonly _templateRef = inject(TemplateRef);
  private readonly _viewContainer = inject(ViewContainerRef);

  transactionType = input.required({
    // eslint-disable-next-line @angular-eslint/no-input-rename
    alias: 'isIncome',
  });

  elseTemplate = input<TemplateRef<any>>(undefined, {
    // eslint-disable-next-line @angular-eslint/no-input-rename
    alias: 'isIncomeElse',
  });

  constructor() {
    effect(() => {
      if (this.transactionType() === TransactionType.INCOME) {
        this._viewContainer.createEmbeddedView(this._templateRef);
      } else {
        if (this.elseTemplate) {
          this._viewContainer.createEmbeddedView(this.elseTemplate()!);
        } else {
          this._viewContainer.clear();
        }
      }
    });
  }
}
