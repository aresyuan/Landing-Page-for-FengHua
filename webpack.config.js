const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CnameWebpackPlugin = require('cname-webpack-plugin');

const DEV_MODE = process.env.NODE_ENV === 'dev';

const options = {
  devtool: DEV_MODE ? 'eval' : 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: DEV_MODE
          ? [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                },
              },
            ]
          : ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader'],
            }),
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'public/[name].[ext]?[hash:7]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              mozjpeg: {
                progressive: true,
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'public/fonts/[name].[ext]',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: [':data-src'],
              minimize: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'windows.jQuery': 'jquery',
    }),
    new CopyWebpackPlugin([
      {
        from: './public',
        to: 'public',
      },
    ]),
    new HtmlWebPackPlugin({
      template: 'index.html',
      favicon: './public/logo-shortcut.png',
      minify: !DEV_MODE && {
        collapseWhitespace: true,
        preserveLineBreaks: true,
        removeComments: true,
      },
    }),
    new ExtractTextPlugin('styles.css'),
  ],
};

if (!DEV_MODE) {
  options.plugins.push(
    new CleanWebpackPlugin(['dist']),
    new CnameWebpackPlugin({
      domain: 'xizhicase.com',
    })
  );
}

module.exports = options;
