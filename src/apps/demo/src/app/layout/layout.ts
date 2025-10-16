import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Header],
  template: `
    <app-header />
    <main class="container mx-auto">
      <router-outlet />
    </main>
  `,
})
export class Layout {}
