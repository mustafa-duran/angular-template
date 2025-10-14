import { Injectable, OnDestroy, signal } from '@angular/core';

export type ThemePreference = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemePreferenceService implements OnDestroy {
  private readonly isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
  private readonly storageKey = 'theme';
  private readonly prefersLightQuery = this.isBrowser
    ? window.matchMedia('(prefers-color-scheme: light)')
    : undefined;
  private readonly currentTheme = signal<ThemePreference>(this.resolveInitialTheme());

  readonly theme = this.currentTheme.asReadonly();

  constructor() {
    if (!this.isBrowser) {
      return;
    }

    this.applyTheme(this.currentTheme());
    this.prefersLightQuery?.addEventListener('change', this.handleSystemPreferenceChange);
  }

  ngOnDestroy(): void {
    this.prefersLightQuery?.removeEventListener('change', this.handleSystemPreferenceChange);
  }

  toggleTheme(): void {
    this.currentTheme.update((theme) => (theme === 'light' ? 'dark' : 'light'));
    this.applyTheme(this.currentTheme());
  }

  private readonly handleSystemPreferenceChange = (event: MediaQueryListEvent): void => {
    this.currentTheme.set(event.matches ? 'light' : 'dark');
    this.applyTheme(this.currentTheme());
  };

  private resolveInitialTheme(): ThemePreference {
    if (!this.isBrowser) {
      return 'dark';
    }

    const storedTheme = this.getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return this.prefersLightQuery?.matches ? 'light' : 'dark';
  }

  private getStoredTheme(): ThemePreference | null {
    if (!this.isBrowser) {
      return null;
    }

    try {
      const stored = window.localStorage.getItem(this.storageKey);
      return stored === 'light' || stored === 'dark' ? (stored as ThemePreference) : null;
    } catch {
      return null;
    }
  }

  private applyTheme(theme: ThemePreference): void {
    if (!this.isBrowser) {
      return;
    }

    document.documentElement.setAttribute('data-theme', theme);
    this.persistTheme(theme);
  }

  private persistTheme(theme: ThemePreference): void {
    try {
      window.localStorage.setItem(this.storageKey, theme);
    } catch {
      /* localStorage might be unavailable */
    }
  }
}
