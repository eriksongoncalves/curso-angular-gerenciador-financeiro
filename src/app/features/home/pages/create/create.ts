import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TransactionType } from '../../../../shared/transaction/enums/transaction-type';
import { TransactionsService } from '../../../../shared/transaction/services/transactions';
import { TransactionPayload } from '../../../../shared/transaction/interfaces/transaction';
import { FeedbackService } from '../../../../shared/transaction/services/feedback';

@Component({
  selector: 'app-create',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    NgxMaskDirective,
  ],
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class Create {
  readonly transactionType = TransactionType;

  form = new FormGroup({
    type: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    value: new FormControl(0, [Validators.required]),
  });

  private readonly _transactionService = inject(TransactionsService);
  private readonly _router = inject(Router);
  private readonly _feedbackService = inject(FeedbackService);

  submit(): void {
    if (this.form.valid) {
      const payload = this.form.value as TransactionPayload;

      this._transactionService.create(payload).subscribe({
        next: () => {
          this._feedbackService.success('Transação criada com sucesso!');
          this._router.navigate(['/']);
        },
      });
    }
  }
}
