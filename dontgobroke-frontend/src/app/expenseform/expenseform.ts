import { Component } from '@angular/core';
import {ChangeDetectionStrategy, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

export interface ExpenseformData {
  title: string;
  description: string;
}

@Component({
  selector: 'app-expenseform',
  imports: [ 
    CommonModule,
    MatDialogModule,
    MatDialogClose,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule
  ],
  templateUrl: './expenseform.html',
  styleUrl: './expenseform.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Expenseform {
  readonly dialogRef = inject(MatDialogRef<Expenseform>);
  readonly data = inject<ExpenseformData>(MAT_DIALOG_DATA);

  close(): void {
    this.dialogRef.close();
  }
}
