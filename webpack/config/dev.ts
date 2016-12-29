import configBase from './base'
import { DevDllPlugin, VendorDllReferencePlugin } from '../dlls';

interface IEntries {
  dev?: Array<string>;
}

const config = configBase<IEntries>();
export default config;

config.entry.dev = [
  'redux-devtools',
  'redux-devtools-log-monitor',
  'redux-devtools-dock-monitor',
  'react-hot-api',
  'react-hot-loader',

  // packages used by webpack-hot-middleware
  'ansi-html',
  'ansi-regex',
  'html-entities',
  'strip-ansi',
];

config.output.library = 'dev';
config.output.libraryTarget = 'var';

config.plugins.push(
  new VendorDllReferencePlugin(),
  new DevDllPlugin()
);
