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
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StComboboxModule, StDemoGeneratorModule } from '@stratio/egeo';

import { StComboboxDemoComponent } from './st-combobox-demo';


@NgModule({
   imports: [
      CommonModule,
      StComboboxModule,
      StDemoGeneratorModule.withComponents({ components: [StComboboxDemoComponent] })
   ],
   declarations: [StComboboxDemoComponent]
})

export class StComboboxDemoModule { }
