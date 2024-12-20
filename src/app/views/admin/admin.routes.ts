import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminUsersComponent } from './views/admin-users/admin-users.component';
import { AdminCocktailsComponent } from './views/admin-cocktails/admin-cocktails.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'users',
        component: AdminUsersComponent,
      },
      {
        path: 'cocktails',
        component: AdminCocktailsComponent,
      },
      {
        path: '',
        redirectTo: 'cocktails',
        pathMatch: 'full',
      },
    ],
  },
];
