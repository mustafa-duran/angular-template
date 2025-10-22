import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { I18nService } from './i18n.service';

export const i18nInterceptor: HttpInterceptorFn = (request, next) => {
  if (!request.url.startsWith('i18n/')) {
    return next(request);
  }

  const i18nService = inject(I18nService);

  // Cache-busting: Add query param with project-language combo
  const cacheBustingValue = `${i18nService.projectName()}-${i18nService.activeLanguage().code}`;
  const params = request.params.set('v', cacheBustingValue);

  const nextRequest = request.clone({
    url: `/${request.url}`,
    params
  });

  return next(nextRequest);
};
