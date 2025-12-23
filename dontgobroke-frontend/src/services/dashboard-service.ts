import { Component, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseFormService } from './expense-form-service';
import { ExpenseDto } from '../models/expense-dto';
import { ExpenseChart } from '../app/expense-chart/expense-chart';


@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/expenses';
  private expenseFormService = inject(ExpenseFormService);

  expenseList = this.expenseFormService.getExpenses();

  // Berechnet Gesamtausgaben ohne Filter
  sumExpenses = computed(() => {
    const expenses = this.expenseList();
    return expenses?.reduce((sum, expense) => sum + expense.amount, 0) ?? 0;
  });

  groupExpensesByCategory(): Map<string, number> {
    const expenses = this.expenseList();
    const grouped = new Map<string, number>();

    expenses?.forEach(expense => {
      if (expense) {
        const current = grouped.get(expense.category) || 0;
        grouped.set(expense.category, current + expense.amount);
      }
    });

    return grouped;
  }

  calculateTotal(expenses: ExpenseDto[]): number {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }
}

  // sumExpenses = computed(() => {
  //   const expenseList = this.expenses();
  //   let sum = 0;
    
  //   expenseList?.forEach(expense => {
  //     if (expense) {
  //       sum += expense.amount;
  //     }
  //   });
  //   console.log(sum);
  //   return sum;
  // });

