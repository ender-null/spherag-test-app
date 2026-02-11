import { I18n } from "i18n-js";
import en from "./assets/languages/en.json";
import es from "./assets/languages/es.json";

const translations = {
  en: en,
  es: es,
};

const i18n = new I18n(translations);

export const supportedLocales = Object.keys(translations);

export const languageCodes: Record<string, string> = {
  en: "en-US",
  es: "es-ES",
};

export default i18n;
