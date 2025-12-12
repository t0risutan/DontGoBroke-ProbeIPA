import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';

const dashboardRoute = {
    path: "dashboard",
    component: Dashboard,
}

export const routes: Routes = [
    dashboardRoute,
]