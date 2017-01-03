// bluebirdjs.com/docs/why-bluebird.html
import * as Bluebird from 'bluebird'

// Warnings are useful for user code, but annoying for third party libraries.
Bluebird.config({ warnings: false });
// https://github.com/babel/babel-loader#custom-polyfills-eg-promise-library
require('babel-runtime/core-js/promise').default = Bluebird;

module.exports = Bluebird;