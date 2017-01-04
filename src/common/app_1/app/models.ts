export const APP_ERROR = 'APP_ERROR';
export const APP_ONLINE = 'APP_ONLINE';
export const APP_SHOW_MENU = 'APP_SHOW_MENU';
export const APP_START = 'APP_START';
export const APP_STARTED = 'APP_STARTED';
export const APP_STOP = 'APP_STOP';
export const TOGGLE_BASELINE = 'TOGGLE_BASELINE';
export const SET_THEME = 'SET_THEME';


export type Action =
      { type: 'APP_ERROR', payload: { error: Error } }
    | { type: 'APP_ONLINE', payload: { online: boolean } }
    | { type: 'APP_SHOW_MENU', payload: { menuShown: boolean } }
    | { type: 'APP_START' }
    | { type: 'APP_STARTED' }
    | { type: 'APP_STOP' }
    | { type: 'SET_THEME', payload: { theme: string } }
    | { type: 'TOGGLE_BASELINE' };

export interface AppState {
    baselineShown: boolean
    currentTheme: string
    error?: Error
    menuShown: boolean
    online: boolean
    started: boolean
}

