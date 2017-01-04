import config from './config'
import errorHandler from './lib/errorHandler'
import * as express from 'express'
import frontend from './frontend'

const app = express();

app.use(frontend);
app.get('*', errorHandler);

app.listen(config.port, config.host, () => {
  console.log(`Server started at http://${config.host}:${config.port}`);
});