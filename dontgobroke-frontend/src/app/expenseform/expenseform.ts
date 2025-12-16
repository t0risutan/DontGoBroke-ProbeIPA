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
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

// interface to represent the form data that is passed to the dialog

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
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule
  ],
  templateUrl: './expenseform.html',
  styleUrl: './expenseform.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

// injection of form data from the dialog

export class Expenseform {
  readonly dialogRef = inject(MatDialogRef<Expenseform>);
  readonly data = inject<ExpenseformData>(MAT_DIALOG_DATA);

  close(): void {
    this.dialogRef.close();
  }
}
