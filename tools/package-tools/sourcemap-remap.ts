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
// There are no type definitions available for these imports.
const sorcery = require('sorcery');

/**
 * Finds the original sourcemap of the file and maps it to the current file.
 * This is useful when multiple transformation happen (e.g TSC -> Rollup -> Uglify)
 */
export async function remapSourcemap(sourceFile: string): Promise<any> {
   // Once sorcery loaded the chain of sourcemaps, the new sourcemap will be written asynchronously.
   return (await sorcery.load(sourceFile)).write();
}


