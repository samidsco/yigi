import config from '../config'
import configReducer from 'common/app_1/config/reducer'
import deviceReducer from 'common/app_1/device/reducer'
import intlReducer from 'common/app_1/intl/reducer'
import loadMessages from '../intl/loadMessages'

const messages = loadMessages();

const createInitialState = () => ({
    config: {
        ...configReducer(),
        appName: config.appName,
        appVersion: config.appVersion
    },
    device: deviceReducer(),
    intl: {
        ...intlReducer(),
        currentLocale: config.defaultLocale,
        defaultLocale: config.defaultLocale,
        locales: config.locales,
        messages,
    },
});

export default createInitialState;
