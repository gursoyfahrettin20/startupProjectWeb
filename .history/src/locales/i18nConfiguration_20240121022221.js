import React from "react";
import { createRoot } from 'react-dom/client';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: { tr: tr, en: en },
        lng: "en",
        fallbackLng: "en",
        ns: ['translation'],
        defaultNS: 'translation',
        keySeparator: ".",
        interpolation: { escapeValue: false, formatSeparator: ',' },
        react: { useSuspense: true }
    });