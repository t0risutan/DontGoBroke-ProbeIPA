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
  
  putExpense(expense: ExpenseDto) {
    return this.http.put<ExpenseDto>(`${this.apiUrl}/${expense.id}`, expense);
  }

  

  // Die Funktion holt alle Ausgaben der Datenbank damit diese weiss,
  // welche die höchste ID ist und addiert +1 bei der ID, jeder neuen Ausgabe.
  
  // Funktioniert momentan nicht wie erwartet, da die ID nicht erhöht wird und immer null ist.

  // createExpense(expense: ExpenseCreateDto) {
  //   return this.getExpenses().pipe(
  //     map(expenses => {
  //       const maxId = expenses.length
  //       ? Math.max(...expenses.map(e => Number(e.id)))
  //       : 0;
  //       return {
  //         ...expense,
  //         id: maxId + 1
  //       };
  //     }),
  //     switchMap(expense => 
  //       this.http.post<ExpenseCreateDto>(this.apiUrl, expense))
  //   );
  // }    
}
