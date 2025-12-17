import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ExpenseDto } from '../models/expense-dto';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/expenses';

  getExpenses() {
    console.log('getExpenses');
    return toSignal(this.http.get<ExpenseDto[]>(this.apiUrl));
  }
}
