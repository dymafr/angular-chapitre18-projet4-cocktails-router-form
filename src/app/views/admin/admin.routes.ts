import { Routes } from '@angular/router';
import { Admin } from './admin';
import { AdminUsers } from './views/admin-users/admin-users';
import { AdminCocktails } from './views/admin-cocktails/admin-cocktails';

export const routes: Routes = [
  {
    path: '',
    component: Admin,
    children: [
      {
        path: 'users',
        component: AdminUsers,
      },
      {
        path: 'cocktails',
        loadChildren: async () =>
          (await import('./views/admin-cocktails/admin-cocktails.routes'))
            .routes,
      },
      {
        path: '',
        redirectTo: 'cocktails',
        pathMatch: 'full',
      },
    ],
  },
];
