import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import { resolve } from 'path';
import { Configuration } from 'webpack';
import { smart } from 'webpack-merge';
import common, { SOURCE_PATH } from './common';

const production: Configuration = {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'initial'
    }
  },
  plugins: [new FaviconsWebpackPlugin(resolve(SOURCE_PATH, 'assets/icons/note.svg'))]
};

export default smart(common, production);
