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
import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'st-pagination-demo',
   templateUrl: './st-pagination-demo.component.html',
   styleUrls: ['./st-pagination-demo.component.scss']
})
export class StPaginationDemoComponent implements OnInit {

   public page: number = 1;
   public perPage: number = 20;
   public title: string = 'pagination';
   public items: Array<any> = [];
   public items2: Array<any> = [];

   constructor(
   ) { }

   ngOnInit(): void {
      this.items = this.generateItems(100);
      this.items2 = this.generateItems(50);

   }

   generateItems(n: number): Array<any> {
      const items: Array<any> = [];

      for (let i = 1; i <= n; i++) {
         items.push({
            label: 'Example' + i,
            value: i
         });
      }

      return items;
   }

   onChangePage($event: any): void {
      this.perPage = $event.perPage;
      this.page = $event.currentPage;
   }

}
