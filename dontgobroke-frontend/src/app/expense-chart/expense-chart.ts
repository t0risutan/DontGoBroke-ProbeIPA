import { Component, ViewChild, Input, inject, computed } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ExpenseDto } from '../../models/expense-dto';
import { ExpenseFormService } from '../../services/expense-form-service';
import { DashboardService } from '../../services/dashboard-service';

@Component({
  selector: 'app-expense-chart',
  imports: [BaseChartDirective, MatButtonModule, MatDividerModule],
  templateUrl: './expense-chart.html',
  styleUrl: './expense-chart.css',
})
export class ExpenseChart {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  private expenseFormService = inject(ExpenseFormService);

  expensesDetails = this.expenseFormService.getExpenses();
  
  // Gruppiert die Daten aus der Kategorie und berechnet die Summe der Ausgaben
  groupedData = computed(() => {
    const expenses = this.expensesDetails();
    const grouped = new Map<string, number>();

    expenses?.forEach(expense => {
      if (expense) {
        const current = grouped.get(expense.category) || 0;
        grouped.set(expense.category, current + expense.amount);
      }
    });

    return Array.from(grouped.entries());
  });
  
  // Daten repräsentation im Pie Chart
  chartData = computed<ChartConfiguration['data']>(() => {
    const grouped = this.groupedData();
    return {  
      labels: grouped.map(([category, amount]) => category),
      datasets: [{
        data: grouped.map(([category, amount]) => amount),
        label: 'CHF',
      }]
    };
  });
}
