import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import zh from './locales/zh.json';
import vi from './locales/vi.json';
import hi from './locales/hi.json';
import tr from './locales/tr.json';
import de from './locales/de.json';
import ru from './locales/ru.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            zh: { translation: zh },
            vi: { translation: vi },
            hi: { translation: hi },
            tr: { translation: tr },
            de: { translation: de },
            ru: { translation: ru },
        },
        lng: "en", // default language
        fallbackLng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
