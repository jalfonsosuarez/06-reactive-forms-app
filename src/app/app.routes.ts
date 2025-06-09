import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'reactive',
    loadChildren: () =>
      import('./reactive/reactive.route').then((m) => m.reactiveRoutes),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.route'),
  },
  {
    path: 'country',
    loadChildren: () =>
      import('./country/country.route').then((m) => m.countryRoutes),
  },
  {
    path: '**',
    redirectTo: 'reactive',
  },
];
