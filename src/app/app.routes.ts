import { Routes } from '@angular/router';
import { CocktailsComponent } from './views/cocktails/cocktails.component';
import { NotFoundComponent } from './views/not-found.component';

export const routes: Routes = [
  {
    path: 'cocktails',
    component: CocktailsComponent,
  },
  {
    path: 'cart',
    loadComponent: async () =>
      (await import('./views/cart/cart.component')).CartComponent,
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
    component: NotFoundComponent,
  },
];
