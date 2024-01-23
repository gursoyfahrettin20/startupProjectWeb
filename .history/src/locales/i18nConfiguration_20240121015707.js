import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { timeAgoTr, tr } from "./tr";
import { en } from "./en"

const initialLanguage = localStorage.getItem(tr) || navigator.language || "tr";

export const i18nInstance = i18n.use(initReactI18next);

i18nInstance.init({
    resources: { tr: tr, en: en },
    fallbackLng: initialLanguage,
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: { escapeValue: false, formatSeparator: ',' },
    react: { useSuspense: true }
});

export default i18n;
