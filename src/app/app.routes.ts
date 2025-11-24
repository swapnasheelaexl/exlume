import { Routes } from '@angular/router';
import { canActivate } from './core/auth/auth.guard';
import { roleGuard } from './core/auth/role.guard';
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'dashboard',
    // canActivate: [canActivate],
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'admin',
    canActivate: [canActivate, roleGuard(['admin'])],
    loadComponent: () =>
      import('./features/admin/admin.component').then(m => m.AdminComponent),
  },
  {
    path: 'manager',
    canActivate: [canActivate, roleGuard(['manager'])],
    loadComponent: () =>
      import('./features/manager/manager.component').then(m => m.ManagerComponent),
  },
  { path: '**', redirectTo: 'login' },
];
