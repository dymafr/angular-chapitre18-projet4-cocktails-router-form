import { Routes } from '@angular/router';
import { AdminCocktails } from './admin-cocktails';
import { AdminCocktailsList } from './views/admin-cocktails-list';
import { AdminCocktailsForm } from './views/admin-cocktails-form';

export const routes: Routes = [
  {
    path: '',
    component: AdminCocktails,
    children: [
      {
        path: 'list',
        component: AdminCocktailsList,
      },
      {
        path: 'new',
        component: AdminCocktailsForm,
      },
      {
        path: ':cocktailId/edit',
        component: AdminCocktailsForm,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];
