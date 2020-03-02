import ForkCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Configuration } from 'webpack';
import { smart } from 'webpack-merge';
import common, { ROOT_PATH } from './common';

const development: Configuration = {
  mode: 'development',
  output: {
    filename: '[name].js'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    host: '0.0.0.0',
    port: 8001,
    before: app => {
      const config = readFileSync(resolve(ROOT_PATH, 'config.json'), 'utf8');

      app.get('/config.json', (_, response) => {
        response.header('Content-Type', 'application/json');
        response.end(config);
      });
    }
  },
  devtool: 'cheap-eval-source-map',
  plugins: [new ForkCheckerWebpackPlugin()]
};

export default smart(common, development);
