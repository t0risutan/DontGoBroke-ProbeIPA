import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { Expenseform } from '../expenseform/expenseform';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet, 
    Expenseform,
    CommonModule,
    MatButtonModule, 
    MatSidenavModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private dialog = inject(MatDialog);

  openExpenseform(): void {
    const dialogRef = this.dialog.open(Expenseform, {
      data: {
        title: '',
        description: ''
      }
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
