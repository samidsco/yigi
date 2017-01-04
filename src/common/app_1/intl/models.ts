export const SET_CURRENT_LOCALE = 'SET_CURRENT_LOCALE';

export type ActionType = 'SET_CURRENT_LOCALE';

export interface Action {
    type: ActionType,
    payload: {
        locale: string
    }
}

export interface IntlState  {
    currentLocale?  : string,
    defaultLocale?  : string,
    initialNow?     : number,
    locales?        : string[],
    messages?       : Object,
};
