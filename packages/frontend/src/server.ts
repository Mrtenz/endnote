import historyApiFallback from 'connect-history-api-fallback';
import express from 'express';
import { resolve } from 'path';
import serveStatic from 'serve-static';

const DIST_FOLDER = resolve(__dirname, '../dist');
const PORT = process.env.PORT || 8001;

/**
 * Basic static file server using Express.
 */
const app = express();

app.use(historyApiFallback());
app.use(serveStatic(DIST_FOLDER));

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
