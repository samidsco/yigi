import * as path from 'path'
import * as webpack from 'webpack'
import * as express from 'express'
const yargs = require('yargs').argv;
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

import configs from './config/apps';
import stats from './stats';
import {BUILD_PUBLIC_DIR, BUILD_SRC_DIR, WEBPACK_PUBLIC_PATH} from '../config';

let portNumber: number = 3000;

function startWebpackServer(config) {
    const app = express();
    const compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, {
        stats,
        noInfo: !yargs.verbose,
        publicPath: path.join(WEBPACK_PUBLIC_PATH, `browser/${config.appName}`)
    }));

    app.use(webpackHotMiddleware(compiler));

    app.use('/fixtures', express.static(`${config.appBuildSrcDir}/tests/fixtures`));
    app.use(['/static', '/*'], express.static(path.join(BUILD_PUBLIC_DIR, `browser/${config.appName}`));

    app.listen(portNumber, '0.0.0.0', function () {
        if (process.send) {
            process.send('express ready');
        }

        console.log(`http://0.0.0.0:${portNumber}`);
        console.log(`http://0.0.0.0:${portNumber}/webpack-dev-server`);
    });

    portNumber++;
}

_.map(configs, startWebpackServer);
