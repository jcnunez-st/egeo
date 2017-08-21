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
import { StDropDownMenuItem } from '@stratio/egeo';

@Component({
   selector: 'st-dropdown-menu-demo',
   templateUrl: 'st-dropdown-menu-demo.html',
   styles: ['.button{border: 1px solid black;}']
})
export class StDropdownMenuDemoComponent {

   public menu: StDropDownMenuItem[] = [];
   public active: boolean = false;
   public selectedValue: StDropDownMenuItem = {value: 'none', label: 'none'};

   constructor() {
      for (let i = 0; i < 15; i++) {
         this.menu.push({
            label: 'option-' + i,
            value: 'option-' + i
         });
      }
   }

   changeActive(): void {
      this.active = !this.active;
      console.log('click button and active is: ', this.active);
   }

   onChange(element: StDropDownMenuItem): void {
      this.active = false;
      this.selectedValue = element;
      console.log('select value and hide menu');
   }
}
