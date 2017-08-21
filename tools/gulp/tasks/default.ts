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
import {task} from 'gulp';
const gulp = require('gulp');

task('default', ['help']);

task('help', function(): void {
  const taskList = Object.keys(gulp.tasks)
    .filter(taskName => !taskName.startsWith(':'))
    .filter(taskName => taskName !== 'default')
    .sort();

  console.log(`\nHere's a list of supported tasks:\n   `, taskList.join('\n    '));
  console.log(`\nYou're probably looking for "test" or "build".\n\n`);
});

