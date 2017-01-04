import app from '../app/reducer'
import config from '../config/reducer'
import device from '../device/reducer'
import intl from '../intl/reducer'
import {combineReducers} from 'redux';
import {fieldsReducer as fields} from 'shared/lib/redux-fields';

// stackoverflow.com/q/35622588/233902
const resetStateOnSignOutReducer = (reducer, initialState) => (state: any,
                                                               action: any,) => {
    const userWasSignedOut =
        action.type === 'ON_AUTH' &&
        state.users.viewer;
    if (!userWasSignedOut) {
        return reducer(state, action);
    }
    // Purge sensitive data, preserve only app and safe initial state.
    return reducer({
        app: state.app,
        config: initialState.config,
        device: initialState.device,
        intl: initialState.intl,
    }, action);
};

const configureReducer = (initialState: Object) => {
    let reducer = combineReducers({
        app,
        config,
        device,
        fields,
        intl
    });

    // The power of higher-order reducers, http://slides.com/omnidan/hor
    reducer = resetStateOnSignOutReducer(reducer, initialState);

    return reducer;
};

export default configureReducer;
