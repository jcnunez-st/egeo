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
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
   selector: 'st-breadcrumbs',
   templateUrl: './st-breadcrumbs.component.html',
   styleUrls: ['./st-breadcrumbs.component.scss']
})
export class StBreadCrumbsComponent {
   @Input() options: string[] = [];
   @Input() qaTag: string;
   @Output() select: EventEmitter<number> = new EventEmitter<number>();

   generateCrumbs(): string[] {
      if (this.options.length <= 6) {
         return [...this.options];
      } else {
         return this.options
            .slice(0, 1)
            .concat(['...'])
            .concat(this.options.slice(-4));
      }
   }

   onSelect(index: number): void {
      if (index + 1 < this.options.length) {
         if (this.options.length <= 6 || index === 0) {
            this.select.emit(index);
         } else {
            let calculatedIndex: number;
            calculatedIndex = this.options.length - (6 - index);
            this.select.emit(index);
         }
      }
   }
}
