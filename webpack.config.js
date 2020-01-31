const path = require('path');

const ENTRY = path.resolve(__dirname, 'client', 'src', 'index.jsx');
const OUTPUT = path.resolve(__dirname, 'client', 'dist');
const BUNDLE_NAME = 'comments.bundle.js';

module.exports = {
  mode: 'development',
  entry: ENTRY,
  output: {
    path: OUTPUT,
    filename: BUNDLE_NAME,
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: "source-map",
};
