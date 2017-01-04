import * as path from 'path'
import * as _ from 'lodash'
import { execSync } from 'child_process'
import ManifestPlugin from '../manifest/plugin'
import configBase from './base'
import {
    TestDllReferencePlugin,
    VendorDllReferencePlugin,
    DevDllReferencePlugin
} from '../dlls'

import {
    PRODUCTION,
    TEST,
    DEVELOPMENT,
    SRC_DIR,
    BUILD_SRC_DIR,
    YIGI_APPS,
    IYigiConfigItem
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
    shared ?: Array < string > ;
    hmr ?: Array < string > ;
}

function getSHA(yigiApp: IYigiConfigItem): string {
    const result: string = execSync(`git rev-list -1 HEAD -- "${SRC_DIR}/browser/${yigiApp.name}"; exit 0`).toString();
    return JSON.stringify(result);
}

function generateConfig(yigiApp: IYigiConfigItem): IConfig < IEntries > {

    const config = configBase<IEntries>(yigiApp);
    const definePlugin = {
        SHA: getSHA(yigiApp),
        DEVELOPMENT,
        PRODUCTION,
        TEST,
    };

    const appBuildSrcDir = path.join(BUILD_SRC_DIR, `browser/${yigiApp.name}`);

    config.appName = yigiApp.name;
    config.appBuildSrcDir = appBuildSrcDir;
    config.entry.shared = [path.join(BUILD_SRC_DIR, 'shared')];
    config.entry[yigiApp.name] = [`${appBuildSrcDir}/index.js`];

    config.plugins.push(
        new DedupePlugin(),
        new OccurenceOrderPlugin(),
        new VendorDllReferencePlugin(),
        new DefinePlugin(definePlugin),
        // new AggressiveMergingPlugin(),
        new CommonsChunkPlugin({
            name: 'shared',
            chunks: ['shared', yigiApp.name],
        }),
        new ProvidePlugin({
            'Promise': 'exports?global.Promise!bluebird',
            'fetch': 'exports?self.fetch!isomorphic-fetch',
        })
    );

    config.module.preLoaders.push({
        test: /\.js$/,
        loader: 'source-map-loader',
        include: [appBuildSrcDir],
    });

    config.module.loaders.push({
        test: /\.(png|jpg|svg)$/,
        loader: 'url-loader?limit=8192',
        include: [appBuildSrcDir],
    });

    if (DEVELOPMENT) {
        config.entry.app.push('webpack-hot-middleware/client');

        config.plugins.push(
            new HotModuleReplacementPlugin(),
            new DevDllReferencePlugin()
        );

        config.module.loaders.push({
            test: /\.js$/,
            loader: 'react-hot',
            include: [appBuildSrcDir],
        });
    }

    if (PRODUCTION) {
        config.plugins.push(
            new UglifyJsPlugin({
                comments: false
            }),
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
}

const config: IConfig<IEntries>[] = _.map(YIGI_APPS, generateConfig);

export default configs;
