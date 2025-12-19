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
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ExpenseCreateDto, ExpenseDto } from '../../models/expense-dto';
import { ExpenseFormService } from '../../services/expense-form-service';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
// Ist wie das Data Transfer Object (DTO) für das Ausgabenformular

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
    MatDatepickerModule,
    MatButtonModule,  
    FormsModule
  ],
  templateUrl: './expenseform.html',
  styleUrl: './expenseform.css',
  providers: [provideNativeDateAdapter()] ,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

// Injection der Formulardaten aus dem Dialog

export class Expenseform {
  readonly dialogRef = inject(MatDialogRef<Expenseform>);
  readonly data = inject<ExpenseCreateDto>(MAT_DIALOG_DATA);
  readonly daten = inject<ExpenseDto>(MAT_DIALOG_DATA);
  private expenseFormService = inject(ExpenseFormService);

  
  expenseForm: ExpenseDto = {
    id: this.daten.id || 0,
    userId: this.daten.userId || 0,
    title: this.data.title || '',
    amount: this.data.amount || 0,
    category: this.data.category || '',
    date: this.data.date || '',
    description: this.data.description || '',
    createdAt: this.daten.createdAt || new Date()
  };

  // Speicher Funktion für die Creation-Funktion und die Update-Funktion, if statement prüft ob die ID vorhanden ist.
  save(): void {
    if (this.expenseForm.id) {
      this.expenseFormService.putExpense(this.expenseForm).subscribe((result) => {
        this.dialogRef.close(result);
        console.log(result);
      });
    } else {
      this.expenseFormService.postExpense(this.expenseForm).subscribe((result) => {
        this.dialogRef.close(result);
        console.log(result);
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
