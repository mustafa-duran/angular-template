import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { i18nInterceptor, LANGUAGE_OPTIONS, provideI18nConfig } from '@core/i18n';
import { selectLanguages } from '@core/utils';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([i18nInterceptor])),
    provideI18nConfig({
      languages: selectLanguages(LANGUAGE_OPTIONS, 'en', 'tr'),
      defaultLanguage: 'en',
      projectName: 'web'
    })
  ]
};
