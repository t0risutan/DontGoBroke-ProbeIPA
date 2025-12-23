import { Component, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; 
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-alltransactions',
  imports: [
    MatSidenavModule, 
    MatButtonModule, 
    CommonModule, 
    MatIconModule, 
    RouterOutlet, 
    RouterLink
  ],
  templateUrl: './alltransactions.html',
  styleUrl: './alltransactions.css',
})
export class Alltransactions {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
    console.log('sidenav toggled');
  }

  closeSidenav() {
    this.sidenav.close();
  }
}
