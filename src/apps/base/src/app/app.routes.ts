import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./homepage/homepage').then((m) => m.Homepage),
  },
  {
    path: 'button',
    loadComponent: () => import('./button/button').then((m) => m.Button),
  },
  {
    path: 'textbox',
    loadComponent: () => import('./textbox/textbox').then((m) => m.Textbox),
  },
];
