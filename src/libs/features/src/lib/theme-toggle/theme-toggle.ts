import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { UiButtonComponent } from '@ui';

import { ThemePreferenceService } from './theme-preference';

@Component({
  selector: 'feature-theme-toggle',
  imports: [UiButtonComponent],
  templateUrl: './theme-toggle.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-live': 'polite',
  },
})
export class ThemeToggleComponent {
  private readonly themePreference = inject<ThemePreferenceService>(ThemePreferenceService);

  readonly theme = this.themePreference.theme;
  readonly isDarkMode = computed(() => this.theme() === 'dark');

  toggleTheme(): void {
    this.themePreference.toggleTheme();
  }
}
