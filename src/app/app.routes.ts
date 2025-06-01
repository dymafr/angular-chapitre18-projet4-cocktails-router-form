import { Routes } from '@angular/router';
import { Cocktails } from './views/cocktails/cocktails';
import { NotFound } from './views/not-found';

export const routes: Routes = [
  {
    path: 'cocktails',
    component: Cocktails,
  },
  {
    path: 'cart',
    loadComponent: async () =>
      (await import('./views/cart/cart')).Cart,
  },
  {
    path: 'admin',
    loadChildren: async () =>
      (await import('./views/admin/admin.routes')).routes,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cocktails',
  },
  {
    path: '**',
    component: NotFound,
  },
];
