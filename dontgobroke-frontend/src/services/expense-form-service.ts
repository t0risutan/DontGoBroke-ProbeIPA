import { inject, Injectable } from '@angular/core';
import { ExpenseCreateDto, ExpenseDto } from '../models/expense-dto';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ExpenseFormService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/expenses';

  getExpenses() {
    return this.http.get<ExpenseDto[]>(this.apiUrl);
  }

  createExpense(expense: ExpenseCreateDto) {
    return this.http.post<ExpenseCreateDto>(this.apiUrl, expense);
  }

  deleteExpense(title: string) {
    return this.http.delete<ExpenseDto>(`${this.apiUrl}/${title}`);
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
