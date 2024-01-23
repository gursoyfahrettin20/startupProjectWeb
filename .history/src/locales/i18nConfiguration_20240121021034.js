import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {timeAgoTr, tr} from "./tr";
import {en} from "./en"
import {register} from "timeago.js";

i18n.use(initReactI18next).init({
    resources: {tr: tr, en: en},
    fallbackLng: 'tr',
    ns: ['translation'],
    defaultNS: 'translation',
    keySeparator: ".",
    interpolation: {escapeValue: false, formatSeparator: ','},
    react: {useSuspense: true}
});

register('tr', timeAgoTr);

export default i18n;
