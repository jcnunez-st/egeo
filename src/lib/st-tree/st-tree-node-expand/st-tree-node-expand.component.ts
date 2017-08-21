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
import { Component, Input } from '@angular/core';

@Component({
   selector: 'st-tree-node-expand',
   templateUrl: 'st-tree-node-expand.component.html'
})

export class StTreeNodeExpandComponent {
   @Input() type: 'expanded' | 'collapsed' | 'root' = 'collapsed';

   getPathDots(): string {
      if (this.type === 'expanded') {
         return 'M2.5 4.5h4';
      }
      if (this.type === 'collapsed') {
         return 'M2.5 4.5h4M4.5 2.5v4';
      }
      return '';
   }

   getGraphDots(): string {
      return this.isRoot() ? 'M.5.5h17v8H.5z' : 'M.5.5h8v8h-8z';
   }

   getDeffDots(): string {
      return this.isRoot() ? 'M0 0h18v9H0z' : 'M0 0h9v9H0z';
   }

   getWidth(): string {
      return this.isRoot() ? '18' : '9';
   }

   getViewBox(): string {
      return this.isRoot() ? '0 0 18 9' : '0 0 9 9';
   }

   isRoot(): boolean {
      return this.type === 'root';
   }
}
