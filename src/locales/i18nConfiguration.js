import i18n from "i18next";
import { tr } from "./tr";
import { en } from "./en"
import { initReactI18next } from "react-i18next";

// Dil değişimi daha önce yapıldıysa localStorage ın Cache belleğinde tutuyor oradan okuyor 
// Dil değişimi daha önce yapılmadıysa "navigator.language" bilgisayar dilini alıyor ona ulaşamaz ise "tr" olarak setleniyor.
const lang = localStorage.getItem("lang") || navigator.language || "tr";

i18n
    .use(initReactI18next)
    .init({
        resources: { tr: tr, en: en },
        fallbackLng: lang,
        ns: ['translation'],
        defaultNS: 'translation',
        keySeparator: ".",
        interpolation: { escapeValue: false, formatSeparator: ',' },
        react: { useSuspense: true }
    });