import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import jaAdminText from './lang/ja';
import enAdminText from './lang/en';
import chAdminText from './lang/ch';

export const DEFAULT_LOCALE = 'ja';
export const LOCALE_LIST = ['en', 'ja'];

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

export const resources = {
  ja: {
    translation: {
      ...jaAdminText
    }
  },
  en: {
    translation: {
      ...enAdminText
    }
  },
  zh: {
    translation: {
      ...chAdminText
    }
  }
} as const;

void i18n.use(initReactI18next).init({
  lng: DEFAULT_LOCALE,
  returnNull: false,
  resources
});

export function setLocale(locale: string): string {
  void i18n.changeLanguage(locale);
  document.documentElement.setAttribute('lang', locale);
  localStorage.setItem('locale', locale);
  return locale;
}

function getLocaleParams() {
  const searchParams = new URLSearchParams(location.search);
  const lang = searchParams.get('lang') || '';
  if (LOCALE_LIST.includes(lang)) {
    return lang;
  }
}

(() => {
  const defaultLocale =
    getLocaleParams() || localStorage.getItem('locale') || DEFAULT_LOCALE;
  setLocale(defaultLocale);
})();

export default i18n;
