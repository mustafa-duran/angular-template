import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/homepage/homepage').then((m) => m.Homepage),
    pathMatch: 'full',
    title: 'Homepage'
  }
];
