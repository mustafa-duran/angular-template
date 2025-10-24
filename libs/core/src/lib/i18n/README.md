# @core/i18n

Signal tabanlı çoklu dil alt yapısı. Çeviri dosyalarını dinamik olarak yükler, seçilen dili saklar.

## Kurulum

```typescript
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { i18nInterceptor, provideI18nConfig, LANGUAGE_OPTIONS } from '@core/i18n';
import { selectLanguages } from '@core/utils';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([i18nInterceptor])),
    provideI18nConfig({
      languages: selectLanguages(LANGUAGE_OPTIONS, 'en', 'tr'),
      defaultLanguage: 'en',
      projectName: 'web'
    })
  ]
};
```

Çeviriler `public/i18n/{project}/{lang}.json` altında tutulur.

```json
// public/i18n/web/en.json
{
  "welcome": "Welcome",
  "hello": "Hello {{name}}"
}
```

## Kullanım

```typescript
import { Component, inject } from '@angular/core';
import { I18nService, TranslatePipe, I18nSelectComponent } from '@core/i18n';

@Component({
  imports: [TranslatePipe, I18nSelectComponent],
  template: `
    <core-i18n-select />
    <h1>{{ 'welcome' | translate }}</h1>
    <button (click)="setLanguage('tr')">Türkçe</button>
  `
})
export class HomepageComponent {
  private readonly i18n = inject(I18nService);

  setLanguage(code: string): void {
    void this.i18n.setLanguage(code);
  }
}
```

## API

- **I18nService**
  - `activeLanguage(): Signal<LanguageOption>`
  - `availableLanguages(): Signal<readonly LanguageOption[]>`
  - `translate(key: string, params?: Record<string, string>): string`
  - `setLanguage(code: LanguageCode): Promise<void>`
  - `setProjectName(name: string): void`
- **TranslatePipe** – template içinden çeviri
- **I18nSelectComponent** – hazır dil seçici
- **i18nInterceptor** – i18n dosyaları için cache-busting

`I18nConfig` arayüzü:

```typescript
interface I18nConfig {
  languages: LanguageOption[];
  defaultLanguage?: LanguageCode;
  projectName?: string;
}
```
