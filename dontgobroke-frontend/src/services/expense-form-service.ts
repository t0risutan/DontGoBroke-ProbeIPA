import { inject, Injectable } from '@angular/core';
import { ExpenseCreateDto, ExpenseDeleteDto, ExpenseDto } from '../models/expense-dto';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ExpenseFormService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/expenses';

  getExpenses() {
    return toSignal(this.http.get<ExpenseDto[]>(this.apiUrl));
  }

  postExpense(expense: ExpenseCreateDto) {
    return this.http.post<ExpenseCreateDto>(this.apiUrl, expense);
  }

  deleteExpense(id: string) {
    return this.http.delete<ExpenseDeleteDto>(`${this.apiUrl}/${id}`);
  }
  
  // Schliesst die id aus, damit diese nicht zwei mal geschickt wird.
  putExpense(expense: ExpenseDto) {
    const { id, ...expenseWithoutId } = expense;
    return this.http.put<ExpenseDto>(`${this.apiUrl}/${id}`, expenseWithoutId);
  }
}
