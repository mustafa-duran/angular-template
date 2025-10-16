import * as i0 from '@angular/core';
import { OnDestroy } from '@angular/core';
import * as features from 'features';

type ThemePreference = 'light' | 'dark';
declare class ThemePreferenceService implements OnDestroy {
    private readonly isBrowser;
    private readonly storageKey;
    private readonly prefersLightQuery;
    private readonly currentTheme;
    readonly theme: i0.Signal<ThemePreference>;
    constructor();
    ngOnDestroy(): void;
    toggleTheme(): void;
    private readonly handleSystemPreferenceChange;
    private resolveInitialTheme;
    private getStoredTheme;
    private applyTheme;
    private persistTheme;
    static ɵfac: i0.ɵɵFactoryDeclaration<ThemePreferenceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ThemePreferenceService>;
}

declare class ThemeToggleComponent {
    private readonly themePreference;
    readonly theme: i0.Signal<features.ThemePreference>;
    readonly isDarkMode: i0.Signal<boolean>;
    toggleTheme(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ThemeToggleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ThemeToggleComponent, "feature-theme-toggle", never, {}, {}, never, never, true, never>;
}

export { ThemePreferenceService, ThemeToggleComponent };
export type { ThemePreference };
