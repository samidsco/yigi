import {Action, SET_CURRENT_LOCALE} from './models'

export const setCurrentLocale = (locale: string): Action => ({
    type: SET_CURRENT_LOCALE,
    payload: { locale },
});
