import I18n, { getLanguages } from 'react-native-i18n';

import { getItem, setItem } from '../services/storageService'
import en from './locales/en';
import zh from './locales/zh';
import zh_Hans from './locales/zh-Hans';
import zh_Hant from './locales/zh-Hans';


I18n.defaultLocale = 'en';
I18n.fallbacks = true;

I18n.translations = {
    en,
    zh,
    'zh-Hans': zh_Hans,
    'zh-Hans-US': zh_Hans,
    'zh-Hant': zh_Hant,
    'zh-Hant-US': zh_Hant
};


// getItem('LOCALE')
//     .then(locale => {
//         if (locale)
//             I18n.defaultLocale = locale;
//             I18n.locale = locale;
//     })


export default I18n;
export { getLanguages } from 'react-native-i18n';

export const translate = (scope) => {
    return I18n.t(scope);
};

export const changeLocale = (locale) => {
    I18n.locale = locale;

    setItem('LOCALE', locale);
};

