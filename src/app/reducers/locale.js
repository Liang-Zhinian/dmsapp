
import I18n from '../i18n/i18n';
console.log(I18n.currentLocale())
const initialAuthState = { default: I18n.currentLocale() };

export default function auth(state = initialAuthState, action) {
    const { payload } = action;
    switch (action.type) {
        case 'CHANGED_LOCALE':
            return { ...state, default: payload.locale };
        default:
            return state;
    }
}