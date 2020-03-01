import ForkCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { Configuration } from 'webpack';
import { smart } from 'webpack-merge';
import common from './common';

const PORT = Number(process.env.PORT) || 8001;

const development: Configuration = {
  mode: 'development',
  output: {
    filename: '[name].js'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    host: '0.0.0.0',
    port: PORT
  },
  devtool: 'cheap-eval-source-map',
  plugins: [new ForkCheckerWebpackPlugin()]
};

export default smart(common, development);
