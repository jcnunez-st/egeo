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
import { buildConfig } from './build-config';
import { join } from 'path';

/** Create a typing file that links to the bundled definitions of NGC. */
export function createTypingsReexportFile(outputDir: string, entryName: string): void {
   writeFileSync(join(outputDir, `${entryName}.d.ts`),
      buildConfig.licenseBanner + '\nexport * from "./typings/index";'
   );
}
