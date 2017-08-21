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
const webpack = require('webpack');
const helpers = require('./helpers');

/*
 * Webpack Plugins
 */
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

/*
 * Webpack Constants
 */
const HMR = helpers.hasProcessFlag('hot');

/*
 * Webpack configuration
 */
module.exports = function(options) {
   sourceFolder = helpers.root();
   tsconfigFile = helpers.root('tsconfig-build.json');
   stylesFiles = [helpers.root('app'), helpers.root('../lib'), helpers.root('../egeo-demo')];
   indexFile = helpers.root('index.html');
   modules = [sourceFolder, helpers.root('../../node_modules'), helpers.root('../lib'), helpers.root('../egeo-demo')];
   alias = {
      '@stratio/egeo': helpers.root('../lib/public_api'),
      '@stratio/egeo-demo': helpers.root('../egeo-demo/public_api')
   };
   entry = {
      'polyfills': helpers.root('polyfills.ts'),
      'main': helpers.root('main.ts')
   };

   return {
      entry,
      context: __dirname,

      resolve: {
         alias,
         extensions: ['.ts', '.js', '.json'],
         modules,

      },
      performance: {
         hints: false
      },
      module: {
         rules: [{
               test: /\.ts$/,
               use: [{
                     loader: '@angularclass/hmr-loader'
                  },
                  { // MAKE SURE TO CHAIN VANILLA JS CODE, I.E. TS COMPILATION OUTPUT.
                     loader: 'ng-router-loader',
                     options: {
                        loader: 'async-import',
                        aot: false
                     }
                  },
                  {
                     loader: 'awesome-typescript-loader',
                     options: {
                        configFileName: tsconfigFile
                     }
                  },
                  {
                     loader: 'angular2-template-loader'
                  }
               ],
               exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
               test: /\.css$/,
               use: ['to-string-loader', 'css-loader'],
               include: stylesFiles
            },
            {
               test: /\.scss$/,
               use: ['to-string-loader', 'css-loader', 'sass-loader'],
               include: stylesFiles
            },
            {
               test: /\.html$/,
               use: 'raw-loader',
               exclude: [indexFile]
            },
            {
               test: /\.(jpg|png|gif)$/,
               use: 'file-loader'
            },
            {
               test: /\.(ttf|eot|svg|woff|woff2|ico)$/,
               use: 'file-loader?name=assets/fonts/[name].[ext]'
            }
         ],

      },


      plugins: [
         new CheckerPlugin(),
         new CommonsChunkPlugin({
            name: 'polyfills',
            chunks: ['polyfills']
         }),
         // This enables tree shaking of the vendor modules
         new CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['main'],
            minChunks: module => /node_modules/.test(module.resource)
         }),
         // Specify the correct order the scripts will be injected in
         new CommonsChunkPlugin({
            name: ['polyfills', 'vendor'].reverse()
         }),
         new ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
            sourceFolder, // location of your web
            {
               // your Angular Async Route paths relative to this root directory
            }
         ),

         new HtmlWebpackPlugin({
            template: indexFile,
            chunksSortMode: 'dependency'
         }),

         new LoaderOptionsPlugin({}),

         // Fix Angular 2
         new NormalModuleReplacementPlugin(
            /facade(\\|\/)async/,
            helpers.root('../../node_modules/@angular/core/src/facade/async.js')
         ),
         new NormalModuleReplacementPlugin(
            /facade(\\|\/)collection/,
            helpers.root('../../node_modules/@angular/core/src/facade/collection.js')
         ),
         new NormalModuleReplacementPlugin(
            /facade(\\|\/)errors/,
            helpers.root('../../node_modules/@angular/core/src/facade/errors.js')
         ),
         new NormalModuleReplacementPlugin(
            /facade(\\|\/)lang/,
            helpers.root('../../node_modules/@angular/core/src/facade/lang.js')
         ),
         new NormalModuleReplacementPlugin(
            /facade(\\|\/)math/,
            helpers.root('../../node_modules/@angular/core/src/facade/math.js')
         )
      ],
      node: {
         global: true,
         crypto: 'empty',
         process: true,
         module: false,
         clearImmediate: false,
         setImmediate: false
      }

   };
}
