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
import { task, watch, src, dest } from 'gulp';
import { join } from 'path';
import { main as tsc } from '@angular/tsc-wrapped';
import { buildConfig } from '../build-config';
import { composeRelease } from '../build-release';
import { buildPackageBundles } from '../build-bundles';
import { inlineResourcesForDirectory } from '../inline-resources';
import { buildScssTask } from './build-scss-task';
import { sequenceTask } from './sequence-task';

// There are no type definitions available for these imports.
const htmlmin = require('gulp-htmlmin');

const { packagesDir, outputDir } = buildConfig;

const htmlMinifierOptions = {
   collapseWhitespace: true,
   removeComments: true,
   caseSensitive: true,
   removeAttributeQuotes: false
};

/**
 * Creates a set of gulp tasks that can build the specified package.
 * @param packageName Name of the package. Needs to be similar to the directory name in `src/`.
 * @param requiredPackages Required packages that will be built before building the current package.
 */
export function createPackageBuildTasks(packageName: string, requiredPackages: string[] = []): void {
   // To avoid refactoring of the project the package egeo will map to the source path `lib/`.
   const packageRoot = join(packagesDir, packageName === 'egeo' ? 'lib' : packageName);
   const packageOut = join(outputDir, 'packages', packageName);

   const tsconfigBuild = join(packageRoot, 'tsconfig-build.json');

   // Paths to the different output files and directories.
   const esmMainFile = join(packageOut, 'index.js');

   // Glob that matches all style files that need to be copied to the package output.
   const stylesGlob = join(packageRoot, '**/*.+(scss|css)');

   // Glob that matches every HTML file in the current package.
   const htmlGlob = join(packageRoot, '**/*.html');

   /**
    * Main tasks for the package building. Tasks execute the different sub-tasks in the correct
    * order.
    */
   task(`${packageName}:clean-build`, sequenceTask('clean', `${packageName}:build`));

   task(`${packageName}:build`, sequenceTask(
      // Build all required packages before building.
      ...requiredPackages.map(pkgName => `${pkgName}:build`),
      // Build ESM and assets output.
      [`${packageName}:build:esm`, `${packageName}:assets`],
      // Inline assets into ESM output.
      `${packageName}:assets:inline`,
      // Build bundles on top of inlined ESM output.
      `${packageName}:build:bundles`
   ));

   /**
    * Release tasks for the package. Tasks compose the release output for the package.
    */
   task(`${packageName}:build-release:clean`, sequenceTask('clean', `${packageName}:build-release`));
   task(`${packageName}:build-release`, [`${packageName}:build`], () => composeRelease(packageName));
   /**
    * TypeScript compilation tasks. Tasks are creating ESM, FESM, UMD bundles for releases.
    */
   task(`${packageName}:build:esm`, () => tsc(tsconfigBuild, { basePath: packageRoot }));

   task(`${packageName}:build:bundles`, () => buildPackageBundles(esmMainFile, packageName));

   /**
    * Asset tasks. Building SASS files and inlining CSS, HTML files into the ESM output.
    */
   task(`${packageName}:assets`, [
      `${packageName}:assets:scss`, `${packageName}:assets:copy-styles`, `${packageName}:assets:html`
   ]);

   task(`${packageName}:assets:scss`, buildScssTask(packageOut, packageRoot, true));
   task(`${packageName}:assets:copy-styles`, () => {
      return src(stylesGlob).pipe(dest(packageOut));
   });
   task(`${packageName}:assets:html`, () => {
      return src(htmlGlob).pipe(htmlmin(htmlMinifierOptions)).pipe(dest(packageOut));
   });

   task(`${packageName}:assets:inline`, () => inlineResourcesForDirectory(packageOut));
}
