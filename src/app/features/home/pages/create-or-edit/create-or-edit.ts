import { Component, inject, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TransactionType } from '../../../../shared/transaction/enums/transaction-type';
import { TransactionsService } from '../../../../shared/transaction/services/transactions';
import {
  Transaction,
  TransactionPayload,
} from '../../../../shared/transaction/interfaces/transaction';
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
  templateUrl: './create-or-edit.html',
  styleUrl: './create-or-edit.scss',
})
export class CreateOrEdit implements OnInit {
  private currentTransaction?: Transaction;
  readonly transactionType = TransactionType;

  transaction = input<Transaction>();

  form = new FormGroup({
    type: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    value: new FormControl(0, [Validators.required]),
  });

  private readonly _transactionService = inject(TransactionsService);
  private readonly _router = inject(Router);
  private readonly _feedbackService = inject(FeedbackService);
  // private readonly _activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    // this.currentTransaction = this._activatedRoute.snapshot.data['transaction'];
    this.currentTransaction = this.transaction();

    this.populateFormFields();
  }

  private populateFormFields(): void {
    if (this.currentTransaction) {
      this.form.setValue({
        title: this.currentTransaction.title,
        type: this.currentTransaction.type,
        value: this.currentTransaction.value,
      });
    }
  }

  submit(): void {
    if (this.form.valid) {
      const payload = this.form.value as TransactionPayload;

      if (this.currentTransaction) {
        this._transactionService.edit(this.currentTransaction.id, payload).subscribe({
          next: () => {
            this._feedbackService.success('Transação alterada com sucesso!');
            this._router.navigate(['/']);
          },
        });
      } else {
        this._transactionService.create(payload).subscribe({
          next: () => {
            this._feedbackService.success('Transação criada com sucesso!');
            this._router.navigate(['/']);
          },
        });
      }
    }
  }
}
