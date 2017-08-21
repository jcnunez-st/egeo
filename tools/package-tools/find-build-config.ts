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
import { resolve, dirname, join } from 'path';
import { existsSync } from 'fs';

/** Name of the build config file. */
const BUILD_CONFIG_FILENAME = 'build-config.js';

/** Method that searches for a build config file that will be used for packaging. */
export function findBuildConfig(): string | null {
   let currentDir = process.cwd();

   while (!existsSync(resolve(currentDir, BUILD_CONFIG_FILENAME))) {
      let parentDir = dirname(currentDir);

      if (parentDir === currentDir) {
         return null;
      }

      currentDir = parentDir;
   }

   return join(currentDir, BUILD_CONFIG_FILENAME);
}
