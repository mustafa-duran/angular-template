import * as i0 from '@angular/core';
import { signal, Injectable, inject, computed, ChangeDetectionStrategy, Component } from '@angular/core';
import { UiButtonComponent } from '@ui';

class ThemePreferenceService {
    isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
    storageKey = 'theme';
    prefersLightQuery = this.isBrowser
        ? window.matchMedia('(prefers-color-scheme: light)')
        : undefined;
    currentTheme = signal(this.resolveInitialTheme(), ...(ngDevMode ? [{ debugName: "currentTheme" }] : []));
    theme = this.currentTheme.asReadonly();
    constructor() {
        if (!this.isBrowser) {
            return;
        }
        this.applyTheme(this.currentTheme());
        this.prefersLightQuery?.addEventListener('change', this.handleSystemPreferenceChange);
    }
    ngOnDestroy() {
        this.prefersLightQuery?.removeEventListener('change', this.handleSystemPreferenceChange);
    }
    toggleTheme() {
        this.currentTheme.update((theme) => (theme === 'light' ? 'dark' : 'light'));
        this.applyTheme(this.currentTheme());
    }
    handleSystemPreferenceChange = (event) => {
        this.currentTheme.set(event.matches ? 'light' : 'dark');
        this.applyTheme(this.currentTheme());
    };
    resolveInitialTheme() {
        if (!this.isBrowser) {
            return 'dark';
        }
        const storedTheme = this.getStoredTheme();
        if (storedTheme) {
            return storedTheme;
        }
        return this.prefersLightQuery?.matches ? 'light' : 'dark';
    }
    getStoredTheme() {
        if (!this.isBrowser) {
            return null;
        }
        try {
            const stored = window.localStorage.getItem(this.storageKey);
            return stored === 'light' || stored === 'dark' ? stored : null;
        }
        catch {
            return null;
        }
    }
    applyTheme(theme) {
        if (!this.isBrowser) {
            return;
        }
        document.documentElement.setAttribute('data-theme', theme);
        this.persistTheme(theme);
    }
    persistTheme(theme) {
        try {
            window.localStorage.setItem(this.storageKey, theme);
        }
        catch {
            /* localStorage might be unavailable */
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.4", ngImport: i0, type: ThemePreferenceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.4", ngImport: i0, type: ThemePreferenceService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.4", ngImport: i0, type: ThemePreferenceService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [] });

class ThemeToggleComponent {
    themePreference = inject(ThemePreferenceService);
    theme = this.themePreference.theme;
    isDarkMode = computed(() => this.theme() === 'dark', ...(ngDevMode ? [{ debugName: "isDarkMode" }] : []));
    toggleTheme() {
        this.themePreference.toggleTheme();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.4", ngImport: i0, type: ThemeToggleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.4", type: ThemeToggleComponent, isStandalone: true, selector: "feature-theme-toggle", host: { attributes: { "aria-live": "polite" } }, ngImport: i0, template: "<ui-button variant=\"ghost\" (click)=\"toggleTheme()\" [attr.aria-pressed]=\"isDarkMode()\">\r\n  @if (isDarkMode()) {\r\n  <svg\r\n    xmlns=\"http://www.w3.org/2000/svg\"\r\n    fill=\"none\"\r\n    viewBox=\"0 0 24 24\"\r\n    stroke-width=\"1.5\"\r\n    stroke=\"currentColor\"\r\n    class=\"size-6\"\r\n    aria-hidden=\"true\"\r\n  >\r\n    <path\r\n      stroke-linecap=\"round\"\r\n      stroke-linejoin=\"round\"\r\n      d=\"M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z\"\r\n    />\r\n  </svg>\r\n  } @else {\r\n  <svg\r\n    xmlns=\"http://www.w3.org/2000/svg\"\r\n    fill=\"none\"\r\n    viewBox=\"0 0 24 24\"\r\n    stroke-width=\"1.5\"\r\n    stroke=\"currentColor\"\r\n    class=\"size-6\"\r\n    aria-hidden=\"true\"\r\n  >\r\n    <path\r\n      stroke-linecap=\"round\"\r\n      stroke-linejoin=\"round\"\r\n      d=\"M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z\"\r\n    />\r\n  </svg>\r\n  }\r\n  <span class=\"sr-only\">Toggle theme</span>\r\n</ui-button>\r\n", dependencies: [{ kind: "component", type: UiButtonComponent, selector: "ui-button", inputs: ["variant", "size", "disabled", "type", "class"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.4", ngImport: i0, type: ThemeToggleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'feature-theme-toggle', imports: [UiButtonComponent], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        'aria-live': 'polite',
                    }, template: "<ui-button variant=\"ghost\" (click)=\"toggleTheme()\" [attr.aria-pressed]=\"isDarkMode()\">\r\n  @if (isDarkMode()) {\r\n  <svg\r\n    xmlns=\"http://www.w3.org/2000/svg\"\r\n    fill=\"none\"\r\n    viewBox=\"0 0 24 24\"\r\n    stroke-width=\"1.5\"\r\n    stroke=\"currentColor\"\r\n    class=\"size-6\"\r\n    aria-hidden=\"true\"\r\n  >\r\n    <path\r\n      stroke-linecap=\"round\"\r\n      stroke-linejoin=\"round\"\r\n      d=\"M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z\"\r\n    />\r\n  </svg>\r\n  } @else {\r\n  <svg\r\n    xmlns=\"http://www.w3.org/2000/svg\"\r\n    fill=\"none\"\r\n    viewBox=\"0 0 24 24\"\r\n    stroke-width=\"1.5\"\r\n    stroke=\"currentColor\"\r\n    class=\"size-6\"\r\n    aria-hidden=\"true\"\r\n  >\r\n    <path\r\n      stroke-linecap=\"round\"\r\n      stroke-linejoin=\"round\"\r\n      d=\"M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z\"\r\n    />\r\n  </svg>\r\n  }\r\n  <span class=\"sr-only\">Toggle theme</span>\r\n</ui-button>\r\n" }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ThemePreferenceService, ThemeToggleComponent };
//# sourceMappingURL=features.mjs.map
