import { inject, Injectable } from '@angular/core';
import { ExpenseCreateDto, ExpenseDto } from '../models/expense-dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExpenseFormService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/expenses';

    createExpense(expense: ExpenseCreateDto,) {
      return this.http.post<ExpenseCreateDto>(this.apiUrl, expense);
    }
}
