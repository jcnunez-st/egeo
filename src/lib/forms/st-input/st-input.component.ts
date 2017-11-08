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
import { Component } from '@angular/core';

import { StFormBaseComponent } from '../st-form-base/st-form-base.component';
import { CreateProvider } from '../st-form-base/st-form-base.provider';

@Component({
   providers: [CreateProvider(StInputComponent)],
   selector: 'st-input',
   styleUrls: ['./st-input.component.scss'],
   templateUrl: './st-input.component.html'
})

export class StInputComponent extends StFormBaseComponent { }
