import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private readonly _snackbar = inject(MatSnackBar);

  success(message: string): void {
    this._snackbar.open(message, 'OK', {
      panelClass: 'snack-bar-success-feedback',
    });
  }
}
