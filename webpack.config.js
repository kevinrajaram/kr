const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: ['./src/index.js', './src/scss/spectre.scss'],
  devServer: {
    contentBase: './src'
  },
  plugins: [
    new ExtractTextPlugin({ // define where to save the file
        filename: 'styles.css',
        allChunks: true,
    }),
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery'",
      "window.$": "jquery"
    })
  ],
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: 'bundle.js'
  },
  module: {
      rules: [
          {
            test: /\.(css|sass|scss)$/,
            loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader', 'postcss-loader']),
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader:"file-loader",
            query:{
              name:'[name].[ext]',
              outputPath:'images/'
            }
          },
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['es2015']
                }
              }
            ]
          }
      ]
  }
};