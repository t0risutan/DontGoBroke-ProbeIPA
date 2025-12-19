import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { Expenseform } from '../expenseform/expenseform';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { ExpenseDto } from '../../models/expense-dto';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ExpenseFormService } from '../../services/expense-form-service';
import { ExpenseChart } from '../expense-chart/expense-chart';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet, 
    Expenseform,
    CommonModule,
    MatButtonModule, 
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    ExpenseChart
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  private dialog = inject(MatDialog);
  private expenseFormService = inject(ExpenseFormService);
  // private deleteExpenseRefresh = new Subject<void>();
  // readonly expenses$ : Observable<ExpenseDto[]>;
  // Zuständig für das Abrufen der Ausgaben
  
  expenses = this.expenseFormService.getExpenses();
  
  openExpenseform(): void {
    const dialogRef = this.dialog.open(Expenseform, {data: {}});
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  triggerDeleteExpense(id: string) {
    this.expenseFormService.deleteExpense(id).subscribe((result) => {
      return this.expenseFormService.getExpenses();
      console.log(result);
    });
  }

  triggerEditExpense(expense: ExpenseDto) {
    const dialogRef = this.dialog.open(Expenseform,  {data: {
      id: expense.id,
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
      description: expense.description,
    }});
     {
      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
      });
    };
  };

  // deleteExpense = this.expenseFormService.deleteExpense;

  // Zuständig für das Öffnen des Ausgabenformulars

  // constructor() {
  //   this.expenses$ = this.deleteExpenseRefresh.pipe(
  //     startWith(null),
  //     switchMap(() => ())
  //   );
  // }
}