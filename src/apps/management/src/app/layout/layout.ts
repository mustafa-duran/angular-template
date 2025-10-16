import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Sidebar, Header, Footer],
  template: `
    <app-sidebar />
    <app-header />
    <router-outlet />
    <app-footer />
  `,
})
export class Layout {}
