import { ChangeDetectionStrategy, Component, computed, signal, ViewChild } from '@angular/core';
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
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { setSelectedDate } from '../../utils/date-helpers';

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
    DecimalPipe,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter(), MatNativeDateModule] ,
})
export class Dashboard {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  private dialog = inject(MatDialog);
  private expenseFormService = inject(ExpenseFormService);
  private dashboardService = inject(DashboardService);

  sumExpenses = this.dashboardService.sumExpenses;
  expenses = this.expenseFormService.getExpenses();

  // Datumsstatus 
  selectedDate = signal(new Date());
  selectedPeriod = signal<'day' | 'week' | 'month' | 'year'>('month');

  // Gefilterte Ausgaben
  filteredExpenses = computed(() => {
    const allExpenses = this.expenses();
    const daten = this.selectedDate();
    const period = this.selectedPeriod();

    if (!allExpenses) return [];

    return allExpenses.filter(expense => 
      setSelectedDate(expense.date, daten, period)
    );
  });
  // Gesamtausgaben gefiltert
  totalExpenses = computed(() => {
    return this.filteredExpenses().reduce((sum, expense) => sum + expense.amount, 0);
  });

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
      this.expenseFormService.refresh();
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
        if (result) {
          this.expenseFormService.refresh();
        }
      });
    };
  };

  onDateChange(event: any) {
    const newDate = event.value;
    if (newDate) {
      this.selectedDate.set(newDate);
    }
  }
}