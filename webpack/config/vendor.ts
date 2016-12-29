import configBase from './base'
import { VendorDllPlugin } from '../dlls'
import { ENV } from '../../config'
import { DefinePlugin } from 'webpack'

interface IEntries {
  vendor?: Array<string>;
}

const config = configBase<IEntries>();
export default config;

config.entry.vendor = [
  'bluebird',
  /*'history',
  'object.assign',
  'radium',*/
  'react',
  'react-dom',
  /*'react-intl',
  'react-redux',
  'react-router',
  'react-router-redux',
  'redux',
  'redux-thunk',
  'reselect',
  'whatwg-fetch',*/
  'isomorphic-fetch'
];

config.output.library = 'vendor';
config.output.libraryTarget = 'var';

config.plugins.push(
  new DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(ENV),
  }),
  new VendorDllPlugin()
);
