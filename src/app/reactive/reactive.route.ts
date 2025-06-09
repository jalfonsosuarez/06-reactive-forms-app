import { Routes } from '@angular/router';
import { BasicPageComponent } from './pages/basic-page/basic-page.component';
import { DynamicPageComponent } from './pages/dynamic-page/dynamic-page.component';
import { SwichesPageComponent } from './pages/swiches-page/swiches-page.component';

export const reactiveRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        title: 'Básicos',
        component: BasicPageComponent,
      },
      {
        path: 'dynamic',
        title: 'Diámicos',
        component: DynamicPageComponent,
      },
      {
        path: 'swiches',
        title: 'Switches',
        component: SwichesPageComponent,
      },
      {
        path: '**',
        redirectTo: 'basic',
      },
    ],
  },
];
