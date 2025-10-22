import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken, Signal, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LANGUAGE_OPTIONS, STORAGE_KEY } from './i18n.constants';
import { I18nConfig, LanguageCode, LanguageOption, TranslationTree } from './i18n.types';

export const I18N_CONFIG = new InjectionToken<I18nConfig>('I18N_CONFIG', {
  providedIn: 'root',
  factory: () => ({
    languages: LANGUAGE_OPTIONS,
    defaultLanguage: 'en',
    projectName: 'web'
  })
});

export function provideI18nConfig(config: I18nConfig): {
  provide: InjectionToken<I18nConfig>;
  useValue: I18nConfig;
} {
  return {
    provide: I18N_CONFIG,
    useValue: config
  };
}

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private readonly http = inject(HttpClient);
  private readonly storage = resolveLocalStorage();
  private readonly config = inject(I18N_CONFIG);

  private readonly languages = signal<LanguageOption[]>(this.config.languages);
  private readonly active = signal<LanguageOption>(
    this.config.languages.find((lang) => lang.code === this.config.defaultLanguage) ??
      this.config.languages[0]
  );
  private readonly project = signal<string>(this.config.projectName ?? 'web');
  private readonly translations = signal<Partial<Record<LanguageCode, Record<string, string>>>>({});

  readonly availableLanguages: Signal<readonly LanguageOption[]> = computed(() => this.languages());
  readonly activeLanguage: Signal<LanguageOption> = computed(() => this.active());
  readonly projectName: Signal<string> = computed(() => this.project());

  constructor() {
    this.restoreLanguageFromStorage();

    queueMicrotask(() => {
      this.persistLanguage(this.active().code);
      void this.loadTranslations(this.active().code);
    });
  }

  async setLanguage(code: LanguageCode): Promise<void> {
    const next = this.languages().find((option) => option.code === code);
    if (!next) {
      console.warn(`Language code "${code}" is not available in the configured languages.`);
      return;
    }

    if (next.code === this.active().code) {
      return;
    }

    await this.loadTranslations(next.code);
    this.active.set(next);
    this.persistLanguage(next.code);
  }

  setProjectName(name: string): void {
    const trimmed = name.trim();
    if (!trimmed || trimmed === this.project()) {
      return;
    }

    this.project.set(trimmed);
    this.resetTranslationsCache();
    void this.loadTranslations(this.active().code);
    this.persistLanguage(this.active().code);
  }

  translate(key: string): string {
    const current = this.translations()[this.active().code];
    return current?.[key] ?? key;
  }

  private async loadTranslations(code: LanguageCode): Promise<void> {
    const cached = this.translations()[code];
    if (cached && Object.keys(cached).length > 0) {
      return;
    }

    try {
      const payload = await firstValueFrom(
        this.http.get<TranslationTree>(`i18n/${this.project()}/${code}.json`)
      );

      const flattened = flattenTranslations(payload);
      this.translations.update((current) => ({ ...current, [code]: flattened }));
    } catch (error) {
      console.error(`Failed to load translations for "${code}":`, error);
      // Set empty translations to prevent repeated failed requests
      this.translations.update((current) => ({ ...current, [code]: {} }));
    }
  }

  private resetTranslationsCache(): void {
    this.translations.set({});
  }

  private restoreLanguageFromStorage(): void {
    const storage = this.storage;
    if (!storage) {
      return;
    }

    const storedCode = storage.getItem(STORAGE_KEY) as LanguageCode | null;
    if (!storedCode) {
      return;
    }

    const match = this.languages().find((option) => option.code === storedCode);
    if (match) {
      this.active.set(match);
    }
  }

  private persistLanguage(code: LanguageCode): void {
    const storage = this.storage;
    if (!storage) {
      return;
    }

    try {
      storage.setItem(STORAGE_KEY, code);
    } catch {
      // Ignore storage write errors.
    }
  }
}

/**
 * Recursively flattens a nested translation tree into a flat key-value map.
 * @param input - The nested translation object
 * @param parentKey - The parent key prefix for nested properties
 * @returns A flattened record with dot-notation keys
 * @example
 * ```ts
 * const tree = { user: { name: 'Name', age: 'Age' } };
 * const flat = flattenTranslations(tree);
 * // Result: { 'user.name': 'Name', 'user.age': 'Age' }
 * ```
 */
export function flattenTranslations(
  input: TranslationTree,
  parentKey = ''
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(input)) {
    const compositeKey = parentKey ? `${parentKey}.${key}` : key;

    if (typeof value === 'string') {
      result[compositeKey] = value;
      continue;
    }

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenTranslations(value as TranslationTree, compositeKey));
    }
  }

  return result;
}

function resolveLocalStorage(): Storage | null {
  try {
    if (typeof window === 'undefined') {
      return null;
    }

    return window.localStorage ?? null;
  } catch {
    return null;
  }
}
