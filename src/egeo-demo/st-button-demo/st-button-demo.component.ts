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
import { StHorizontalTab } from '@stratio/egeo';

@Component({
   selector: 'st-button-demo',
   templateUrl: './st-button-demo.component.html',
   styleUrls: ['./st-button-demo.component.scss']
})

export class StButtonDemoComponent {
   public options: StHorizontalTab[] = [
      { text: 'NEW WAY', isDisabled: false },
      { text: 'OLD WAY', isDisabled: false }
   ];

   public active: string = 'NEW WAY';

   public onChangeOption(option: string): void {
      this.active = option;
   }

   public test1(): void {
      console.log('You clicked the button 1!');
   }

   public test2(): void {
      console.log('You clicked the button 2!');
   }
}
