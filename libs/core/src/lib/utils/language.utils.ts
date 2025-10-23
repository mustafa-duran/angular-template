import type { LanguageOption } from '../i18n/i18n.types';

/**
 * Filters language options by their language codes.
 *
 * @param languages - Available language options
 * @param codes - Language codes to filter by
 * @returns Filtered array of language options
 *
 * @example
 * ```ts
 * const selected = selectLanguages(LANGUAGE_OPTIONS, 'en', 'tr');
 * ```
 */
export function selectLanguages(
  languages: readonly LanguageOption[],
  ...codes: string[]
): LanguageOption[] {
  return languages.filter((lang) => codes.includes(lang.code));
}
