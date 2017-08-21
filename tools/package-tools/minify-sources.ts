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
import { writeFileSync } from 'fs';

// There are no type definitions available for these imports.
const uglify = require('uglify-js');

/** Minifies a JavaScript file by using UglifyJS2. Also writes sourcemaps to the output. */
export function uglifyJsFile(inputPath: string, outputPath: string): void {
   const sourcemapOut = `${outputPath}.map`;
   const result = uglify.minify(inputPath, {
      preserveComments: 'license',
      outSourceMap: sourcemapOut
   });

   writeFileSync(outputPath, result.code);
   writeFileSync(sourcemapOut, result.map);
}
