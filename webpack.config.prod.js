const { resolve } = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: [
        'babel-polyfill',
        // allows async/await from es-2017 babel preset to work on older browsers
        './index.jsx'
        // the entry point of our app
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    output: {
        filename: 'bundle.js',
        // the output bundle

        path: resolve(__dirname, 'dist'),
    },

    devtool: 'source-map',

    context: resolve(__dirname, 'src'),

    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: [
                'babel-loader'
            ],
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[path][name]__[local]--[hash:base64:5]'
                }
              }
            ]
          }],
    },

    plugins: [
      new UglifyJSPlugin({
        sourceMap: true
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ],
};
