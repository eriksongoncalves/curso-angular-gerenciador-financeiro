import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

import { DialogData } from '../../interfaces/dialog-data';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [MatDialogModule, MatButton],
  templateUrl: './confirmation-dialog.html',
  styleUrl: './confirmation-dialog.scss',
})
export class ConfirmationDialog {
  dialogData = inject<DialogData>(MAT_DIALOG_DATA);
}
