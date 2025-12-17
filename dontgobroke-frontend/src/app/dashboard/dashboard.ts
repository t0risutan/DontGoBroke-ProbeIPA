import { Component } from '@angular/core';
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
import { DashboardService } from '../../services/dashboard-service';
@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet, 
    Expenseform,
    CommonModule,
    MatButtonModule, 
    MatSidenavModule,
    MatCardModule,
    MatListModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private dialog = inject(MatDialog);
  private dashboardService = inject(DashboardService);
  private expenseFormService = inject(ExpenseFormService);
  // Zuständig für das Abrufen der Ausgaben
  
  expenses = this.dashboardService.getExpenses();
  deleteExpense = this.expenseFormService.deleteExpense;


  // Zuständig für das Öffnen des Ausgabenformulars
  openExpenseform(): void {
    const dialogRef = this.dialog.open(Expenseform, {data: {}});
    
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
