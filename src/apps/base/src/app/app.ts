import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToggleTheme } from './toggle-theme/toggle-theme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToggleTheme],
  template: `
    <app-toggle-theme></app-toggle-theme>
    <router-outlet />
  `,
})
export class App {}
