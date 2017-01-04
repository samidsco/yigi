import { Action,
    APP_ERROR,
    APP_SHOW_MENU,
    APP_ONLINE,
    APP_STOP,
    APP_START,
    APP_STARTED,
    TOGGLE_BASELINE,
    SET_THEME
} from './models'
import { REHYDRATE } from 'redux-persist/constants';

export const appError = (error: Error): Action => ({
    type: APP_ERROR,
    payload: { error },
});

export const appOnline = (online: boolean): Action => ({
    type: APP_ONLINE,
    payload: { online },
});

export const appShowMenu = (menuShown: boolean): Action => ({
    type: APP_SHOW_MENU,
    payload: { menuShown },
});

// Called on componentDidMount aka only at the client (browser or native).
export const appStart = (): Action => ({
    type: APP_START,
});

export const appStarted = (): Action => ({
    type: APP_STARTED,
});

export const appStop = (): Action => ({
    type: APP_STOP,
});

export const toggleBaseline = (): Action => ({
    type: TOGGLE_BASELINE,
});

export const setTheme = (theme: string): Action => ({
    type: SET_THEME,
    payload: { theme },
});

// TODO: Observable type.
const appStartEpic = (action$: any) =>
    action$.ofType(REHYDRATE)
        .map(appStarted);


export const epics = [
    appStartEpic,
];
