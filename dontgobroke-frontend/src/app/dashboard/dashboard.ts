import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { Expenseform } from '../expenseform/expenseform';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { ExpenseDto } from '../../models/expense-dto';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ExpenseFormService } from '../../services/expense-form-service';
import { ExpenseChart } from '../expense-chart/expense-chart';
import { MatDrawerContainer } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService } from '../../services/dashboard-service';
import { DecimalPipe } from '@angular/common';

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
    ExpenseChart,
    MatDrawerContainer,
    MatIconModule,
    RouterOutlet,
    RouterLink,
    DecimalPipe
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  private dialog = inject(MatDialog);
  private expenseFormService = inject(ExpenseFormService);
  private dashboardService = inject(DashboardService);
  // private deleteExpenseRefresh = new Subject<void>();
  // readonly expenses$ : Observable<ExpenseDto[]>;
  // Zuständig für das Abrufen der Ausgaben

  sumExpenses = this.dashboardService.sumExpenses;
  expenses = this.expenseFormService.getExpenses();

  // displaySumExpenses() {
  //   return this.sumExpenses();
  // }

  toggleSidenav() {
    this.sidenav.toggle();
  }
  
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