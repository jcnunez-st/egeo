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
import { createPackageBuildTasks } from 'build-tools';

// Create gulp tasks to build the different packages in the project.
createPackageBuildTasks('egeo');
createPackageBuildTasks('egeo-demo', ['egeo']);

import './tasks/aot';
import './tasks/clean';
import './tasks/default';
import './tasks/egeo-publish';
import './tasks/lint';
import './tasks/payload';
import './tasks/validate-release';
