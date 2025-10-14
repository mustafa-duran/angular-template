import { Component } from '@angular/core';
import { ThemeToggleComponent } from '@features';

@Component({
  selector: 'app-toggle-theme',
  imports: [ThemeToggleComponent],
  templateUrl: './toggle-theme.html',
})
export class ToggleTheme {}
