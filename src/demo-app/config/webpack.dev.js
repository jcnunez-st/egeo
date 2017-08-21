/*
 * © 2017 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */
const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const webpackMergeDll = webpackMerge.strategy({ plugins: 'replace' });

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const HMR = helpers.hasProcessFlag('hot');


const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;

module.exports = function (options) {
   console.log('\n\n******************************* DEVELOPMENT *******************************\n\n');
   return webpackMerge(commonConfig({ env: ENV }), {

      devtool: 'inline-source-map',

      output: {
         path: helpers.root('dist'),
         filename: '[name].js',
         sourceMapFilename: '[name].map',
         chunkFilename: '[id].chunk.js',
         library: 'ac_[name]',
         libraryTarget: 'var',


      },
 module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          include: [helpers.root('styles')]
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
          include: [helpers.root('styles')]
        },

      ]

    },
      plugins: [
         new LoaderOptionsPlugin({
            debug: true,
            options: { }
         }),
         new DllBundlesPlugin({
            bundles: {
               polyfills: [
                  'core-js',
                  {
                     name: 'zone.js',
                     path: 'zone.js/dist/zone.js'
                  },
                  {
                     name: 'zone.js',
                     path: 'zone.js/dist/long-stack-trace-zone.js'
                  }
               ],
               vendor: [
                  '@angular/platform-browser',
                  '@angular/platform-browser-dynamic',
                  '@angular/core',
                  '@angular/common',
                  '@angular/forms',
                  '@angular/http',
                  '@angular/router',
                  '@angularclass/hmr',
                  'rxjs',
               ]
            },
            dllDir: helpers.root('temp', 'dll'),
            webpackConfig: webpackMergeDll(commonConfig({ env: ENV }), {
               devtool: 'cheap-module-source-map',
               plugins: []
            })
         }),
         new AddAssetHtmlPlugin([
            { filepath: helpers.root(`temp/dll/${DllBundlesPlugin.resolveFile('polyfills')}`) },
            { filepath: helpers.root(`temp/dll/${DllBundlesPlugin.resolveFile('vendor')}`) }
         ]),
      ],

      devServer: {
         port: PORT,
         host: HOST,
         historyApiFallback: true,
         stats: "errors-only",
         clientLogLevel: "warning"
      },
      node: {
         global: true,
         crypto: 'empty',
         process: true,
         module: false,
         clearImmediate: false,
         setImmediate: false
      }
   });
}
