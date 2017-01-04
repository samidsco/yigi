/**
 * Base config for all Webpack configurations.
 */

import ManifestPlugin from '../manifest/plugin'

import {
  PRODUCTION,
  DEVELOPMENT,
  BUILD_PUBLIC_DIR,
  BUILD_SRC_DIR,
  WEBPACK_PUBLIC_PATH,
  YIGI_APPS,
  IYigiAppConfigItem
} from '../../config'

const {
  optimize: {
    UglifyJsPlugin,
  },
} = require('webpack');

interface ILoader {
  test: RegExp;
  loaders?: Array<string>;
  loader?: string;
  include?: Array<string>;
}

interface IOutput {
  path?: string;
  publicPath?: string;
  filename?: string;
  chunkFilename?: string;
  library?: string;
  libraryTarget?: 'var';
}

interface IConfig<IEntry> {
  target: string;
  devtool?: string;
  entry: IEntry;
  plugins: Array<any>;
  noParse: Array<string | RegExp>;
  output: IOutput;
  resolve: {
    alias: {}
  };
  module: {
    preLoaders: Array<ILoader>;
    loaders: Array<ILoader>;
  };
};

const babel = (appName) => ({
  test: /\.js$/,
  loader: 'babel',
  include: `${BUILD_SRC_DIR}/${appName}`,
  query: {
    presets: ['es2015'],
    plugins: <string | any>['static-fs'],
  }
});

const sourceMap = (appName) => ({
  test: /\.js$/,
  loader: 'source-map',
  include: [`${BUILD_SRC_DIR}/${appName}`],
});

const sourceMapFix = (appName) => ({
  test: /\.js$/,
  loader: `${__dirname}/source-map-fix.ts`,
  include: `${BUILD_SRC_DIR}/${appName}`,
});

export default function <Entry>(yigiApp: IYigiConfigItem): IConfig<Entry> {
  const config = {
    target: 'web',
    // devtool: '#source-map',
    entry: <Entry>{},
    plugins: [],
    output: <IOutput>{
      path: `${BUILD_PUBLIC_DIR}/${yigiApp.name}`,
      publicPath: `${WEBPACK_PUBLIC_PATH}/${yigiApp.name}`,
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
    resolve: {
      alias: {
        sinon: 'sinon/pkg/sinon.js',
      },
    },
    noParse: [/\/sinon\//],
    module: {
      preLoaders: [],
      loaders: [],
    },
  };

  config.module.loaders.push(babel(yigiApp.name));

  if (DEVELOPMENT) {
    // configure hot reload for development
    babel.query.presets.push('react-hmre');
    babel.query.plugins.push([
      'react-transform', {
        transforms: [
          {
            transform: 'react-transform-hmr',
            imports: ['react'],
            locals: ['module']
          }
        ]
      }
    ]);
  }

  if (!PRODUCTION) {
    config.module.preLoaders.push(sourceMap(yigiApp.name));
    config.module.loaders.push(sourceMapFix(yigiApp.name));
  }

  if (PRODUCTION) {
    // config.devtool = 'source-map';

    config.output.filename = '[name]-[hash].js';
    config.output.chunkFilename = '[name]-[hash].js';

    config.plugins.push(
      new UglifyJsPlugin({ comments: false }),
      new ManifestPlugin()
    );
  }

  return config;
}
