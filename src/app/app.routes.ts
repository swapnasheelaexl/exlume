import { Routes } from '@angular/router';
import { canActivate } from './core/auth/auth.guard';
import { roleGuard } from './core/auth/role.guard';
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then((m) => m.LoginComponent),
  },
 {
    path: 'dashboard',
    canActivate: [canActivate],
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    children: [
      {
        path: '', // DEFAULT child route
        pathMatch: 'full',
        loadComponent: () =>
          import('./features/product-list/product-list').then((m) => m.ProductList),
      },
      {
        path: 'product/:id',
        loadComponent: () =>
          import('./features/product-list/universal-life/universal-life').then(
            (m) => m.UniversalLifeComponent
          ),
      },
    ],
  },
  {
    path: 'admin',
    canActivate: [canActivate, roleGuard(['admin'])],
    loadComponent: () => import('./features/admin/admin.component').then((m) => m.AdminComponent),
  },
  {
    path: 'manager',
    canActivate: [canActivate, roleGuard(['manager'])],
    loadComponent: () =>
      import('./features/manager/manager.component').then((m) => m.ManagerComponent),
  },
  // {
  //   path: 'product/:id',
  //   canActivate: [canActivate], // optional, if only authenticated users can view products
  //   loadComponent: () =>
  //     import('./features/product-list/universal-life/universal-life').then(
  //       (m) => m.UniversalLifeComponent
  //     ),
  // },
  { path: '**', redirectTo: 'login' },
];
