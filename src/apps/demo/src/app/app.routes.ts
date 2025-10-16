import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout').then((m) => m.Layout),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/homepage/homepage').then((m) => m.Homepage),
        pathMatch: 'full',
      },
      {
        path: 'button',
        loadComponent: () => import('./pages/button/button').then((m) => m.Button),
      },
      {
        path: 'textbox',
        loadComponent: () => import('./pages/textbox/textbox').then((m) => m.Textbox),
      },
      {
        path: 'navigation-menu',
        loadComponent: () =>
          import('./pages/navigation-menu/navigation-menu').then((m) => m.NavigationMenu),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    title: 'Redirecting...',
  },
];
