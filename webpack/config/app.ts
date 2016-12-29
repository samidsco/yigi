import * as path from 'path'
import { execSync } from 'child_process'
import ManifestPlugin from '../manifest/plugin'
import configBase from './base'
import { TestDllReferencePlugin, VendorDllReferencePlugin, DevDllReferencePlugin } from '../dlls'

import {
  PRODUCTION,
  TEST,
  DEVELOPMENT,
  BUILD_SRC_DIR,
} from '../../config'

const {
  DefinePlugin,
  HotModuleReplacementPlugin,
  ProvidePlugin,
  optimize: {
    UglifyJsPlugin,
    DedupePlugin,
    OccurenceOrderPlugin,
    CommonsChunkPlugin,
  },
} = require('webpack');

interface IEntries {
  components?: Array<string>;
  app?: Array<string>;
  hmr?: Array<string>;
}

const config = configBase<IEntries>();
const definePlugin = {
  SHA: getSHA(),
  DEVELOPMENT,
  PRODUCTION,
  TEST,
};

export default config;

//config.entry.components = [path.join(BUILD_SRC_DIR, 'components')];
config.entry.app = [path.join(BUILD_SRC_DIR, 'browser/index.js')];

config.plugins.push(
  new DedupePlugin(),
  new OccurenceOrderPlugin(),
  new VendorDllReferencePlugin(),
  new DefinePlugin(definePlugin),
  // new AggressiveMergingPlugin(),
  new CommonsChunkPlugin({
    name: 'components',
    chunks: [ /*'components',*/ 'app'],
  }),
  new ProvidePlugin({
    'Promise': 'exports?global.Promise!bluebird',
    'fetch': 'exports?self.fetch!isomorphic-fetch',
  })
);

config.module.preLoaders.push(
  {
    test: /\.js$/,
    loader: 'source-map-loader',
    include: [BUILD_SRC_DIR],
  }
);

config.module.loaders.push(
  {
    test: /\.(png|jpg|svg)$/,
    loader: 'url-loader?limit=8192',
    include: [BUILD_SRC_DIR],
  }
);

if (DEVELOPMENT) {
  config.entry.app.push('webpack-hot-middleware/client');

  config.plugins.push(
    new HotModuleReplacementPlugin(),
    new DevDllReferencePlugin()
  );

  config.module.loaders.push(
    {
      test: /\.js$/,
      loader: 'react-hot',
      include: [BUILD_SRC_DIR],
    }
  );
}

if (PRODUCTION) {
  config.plugins.push(
    new UglifyJsPlugin({ comments: false }),
    new ManifestPlugin()
  );

  const noop = `${__dirname}/noop.js`;

  config.resolve.alias['redux-devtools'] = noop;
  config.resolve.alias['redux-devtools-log-monitor'] = noop;
  config.resolve.alias['redux-devtools-dock-monitor'] = noop;
}

if (TEST) {
  config.entry = {};
  config.output = {};
  config.plugins = [
    new DefinePlugin(definePlugin),
    new TestDllReferencePlugin(),
    new VendorDllReferencePlugin(),
  ];
}

function getSHA(): string {
  const result: string = execSync('git describe --exact-match --tags HEAD 2>&1; exit 0').toString();
  const matches: Array<string> = result.match(/^fatal: no tag exactly matches '(\w+)'/);
  return JSON.stringify((matches && matches[1]) || result);
}
