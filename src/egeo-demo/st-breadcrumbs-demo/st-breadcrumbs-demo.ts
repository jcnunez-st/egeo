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

@Component({
   selector: 'st-breadcrumbs-demo',
   templateUrl: 'st-breadcrumbs-demo.html'
})
export class StBreadcrumbsDemoComponent {
   public output: String;

   public options: String[] = [];

   constructor() {
      this.options = ['example1', 'example2', 'example3'];
   }

   outputEmitter($event: any, type: String): void {
      this.output = type + $event;
      console.log(this.output);
   }
}
