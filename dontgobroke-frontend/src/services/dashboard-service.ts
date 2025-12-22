import { Component, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ExpenseDto } from '../models/expense-dto';
import { Expenseform } from '../app/expenseform/expenseform';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseFormService } from './expense-form-service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/expenses';
  private dialog = inject(MatDialog);
  private expenseFormService = inject(ExpenseFormService);


  expenses = this.expenseFormService.getExpenses();

  sumExpenses = computed(() => {
    const expenses = this.expenses();
    return expenses?.reduce((sum, expense) => sum + expense.amount, 0) ?? 0;
  });

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
}
