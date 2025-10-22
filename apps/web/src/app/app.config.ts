import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { i18nInterceptor, LANGUAGE_OPTIONS, provideI18nConfig } from '@core/i18n';
import { routes } from './app.routes';

const selectLanguages = (...codes: string[]) =>
  LANGUAGE_OPTIONS.filter((lang) => codes.includes(lang.code));

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([i18nInterceptor])),
    provideI18nConfig({
      languages: selectLanguages('en', 'tr'),
      defaultLanguage: 'en',
      projectName: 'web'
    })
  ]
};
