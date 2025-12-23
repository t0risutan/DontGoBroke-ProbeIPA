import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Alltransactions } from './alltransactions/alltransactions';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard').then((m) => m.Dashboard),
    },
    {
        path: 'expense-chart',
        loadComponent: () =>
          import('./expense-chart/expense-chart').then((m) => m.ExpenseChart),
    },
    {
        path: 'alltransactions',
        loadComponent: () =>
          import('./alltransactions/alltransactions').then((m) => m.Alltransactions),
    },
]