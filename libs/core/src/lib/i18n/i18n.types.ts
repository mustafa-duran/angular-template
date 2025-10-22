export type LanguageCode =
  | 'en'
  | 'tr'
  | 'es'
  | 'fr'
  | 'de'
  | 'zh'
  | 'ja'
  | 'ru'
  | 'ar'
  | 'pt'
  | 'it'
  | 'nl'
  | 'ko'
  | 'hi'
  | 'sv'
  | 'no'
  | 'da'
  | 'fi'
  | 'pl'
  | 'cs'
  | 'uk'
  | 'el'
  | 'he'
  | 'th'
  | 'vi'
  | 'id'
  | 'ms'
  | 'ro'
  | 'hu'
  | 'sk'
  | 'bg'
  | 'hr'
  | 'sr'
  | 'bn'
  | 'ta'
  | 'te'
  | 'fa'
  | 'ur'
  | 'sw';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
}

export interface I18nConfig {
  languages: LanguageOption[];
  defaultLanguage?: LanguageCode;
  projectName?: string;
}

export type TranslationTree = Record<string, unknown>;
