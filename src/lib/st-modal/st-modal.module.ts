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
import { CommonModule } from '@angular/common';
import { ANALYZE_FOR_ENTRY_COMPONENTS, NgModule } from '@angular/core';

import { StButtonModule } from '../st-button/st-button.module';
import { StModal } from './st-modal.component';

@NgModule({
   imports: [CommonModule, StButtonModule],
   exports: [StModal],
   declarations: [StModal],
   entryComponents: [StModal],
   providers: []
})
export class StModalModule {
   static withComponents(components: any[]): any {
      return {
         ngModule: StModalModule,
         providers: [
            { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true }
         ]
      };
   }
}
