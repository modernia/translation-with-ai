export const SUPPORTED_LANGUAGES = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  jp: '日本語',
  ko: '한국어',
  pt: 'Português',
};

export const AUTO_LANG = 'auto';

export type Language = keyof typeof SUPPORTED_LANGUAGES;
export type AutoLanguage = typeof AUTO_LANG;
export type FromLanguage = Language | AutoLanguage;


export interface State {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  text: string;
  translation: string;
  loading: boolean;
}