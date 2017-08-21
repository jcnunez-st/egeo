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
import { task } from 'gulp';
import { execNodeTask } from '../util/task_helpers';
import { join } from 'path';
import { buildConfig } from 'build-tools';

/** Glob that matches all SCSS or CSS files that should be linted. */
const stylesGlob = '+(tools|src)/**/*.+(css|scss)';

/** List of flags that will passed to the different TSLint tasks. */
let tsconfigFile = join(buildConfig.packagesDir, 'lib', 'tsconfig.json');
const tsLintBaseFlags = ['-c', 'tslint.json', '--type-check', '-p', tsconfigFile];

/** Path to the output of the egeo package. */
const egeoOutput = join(buildConfig.outputDir, 'packages', 'egeo');

// TODO REVIEW AND ACTIVATE
// task('lint', ['tslint', 'stylelint', 'madge']);
task('lint', ['tslint', 'madge']);

/** Task that runs madge to detect circular dependencies. */
task('madge', ['egeo:clean-build'], execNodeTask(
   'madge', ['--circular', egeoOutput])
);

/** Task to lint egeo scss stylesheets. */
// TODO: REVIEW AND ACTIVATE
// task('stylelint', execNodeTask(
//    'stylelint', [stylesGlob, '--config', 'stylelint-config.json', '--syntax', 'scss']
// ));

/** Task to run TSLint against the e2e/ and src/ directories. */
task('tslint', execNodeTask('tslint', tsLintBaseFlags));

/** Task that automatically fixes TSLint warnings. */
task('tslint:fix', execNodeTask('tslint', [...tsLintBaseFlags, '--fix']));
