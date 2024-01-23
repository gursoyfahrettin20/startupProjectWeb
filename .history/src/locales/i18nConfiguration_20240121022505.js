import React from "react";
import i18n from "i18next";
import { tr } from "./tr";
import { en } from "./en"
import { initReactI18next } from "react-i18next";

i18n
    .use(initReactI18next)
    .init({
        resources: { tr: tr, en: en },
        lng: "en",
        fallbackLng: "en",
        ns: ['translation'],
        interpolation: { escapeValue: false, formatSeparator: ',' },
        react: { useSuspense: true }
    });