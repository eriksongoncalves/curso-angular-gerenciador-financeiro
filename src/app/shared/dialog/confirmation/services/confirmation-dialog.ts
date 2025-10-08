import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable } from 'rxjs';

import { ConfirmationDialog } from '../components/confirmation-dialog/confirmation-dialog';
import { DialogData } from '../interfaces/dialog-data';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  private readonly _dialog = inject(MatDialog);

  open(data: DialogData): Observable<boolean> {
    return this._dialog
      .open(ConfirmationDialog, {
        data,
      })
      .afterClosed()
      .pipe(filter((response: boolean) => !!response));
  }
}
