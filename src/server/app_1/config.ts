// www.andrewsouthpaw.com/2015/02/08/environment-variables/
import * as nconf from 'nconf'

// Use less-terrible separator character, stackoverflow.com/questions/25017495
//nconf.env('__');

// For local development, we can override defaults easily. Rename
// src/common/_config.json to src/common/config.json and uncomment next line.
// nconf.file('src/common/config.json');

// Remember, never put secrets in the source code. Use environment variables for
// production or src/common/config.json for development instead.
nconf.defaults({
    appName: 'App 1',
    // Use appVersion defined in gulp env task or Heroku dyno metadata.
    appVersion: process.env.appVersion || process.env.HEROKU_SLUG_COMMIT,
    defaultLocale: 'en',
    googleAnalyticsId: 'UA-XXXXXXX-X',
    isProduction: process.env.NODE_ENV === 'production',
    locales: ['en', 'ru'],
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
    // Enable hot reload on remote device. Note it prevents offline testing,
    // because it depends on ip.address(), which doesn't work with disabled wifi.
    // How do we access a website running on localhost from mobile browser?
    // stackoverflow.com/questions/3132105
    remoteHotReload: true,
    sentryUrl: '',
});

export default nconf.get(null);
