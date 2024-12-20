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
