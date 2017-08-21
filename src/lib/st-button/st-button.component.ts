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
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
   selector: 'st-button',
   templateUrl: './st-button.component.html'
})

export class StButtonComponent implements OnInit {
   @Input() inputType: string = 'button'; // button / submit / reset
   @Input() isDisabled: boolean = false;
   @Input() leftIcon: string;
   @Input() qaTag: string;
   @Input() rightIcon: string;
   @Input() subtypeClass: string = 'default';
   @Input() text: string = 'Click Me';
   @Input() themeClass: string;
   @Input() typeClass: string = 'btnMain';

   @Output() onClick: EventEmitter<any> = new EventEmitter();

   public internalText: string = '';

   ngOnInit(): void {
      if (this.typeClass !== 'btnTool') {
         this.internalText = this.text;
      }
   }

   public getButtonTypeClass(): string {

      if (this.typeClass === 'btnMain') {
         switch (this.subtypeClass) {
            case 'subtype1': return `button-sq1`;
            case 'subtype2': return `button-sq2`;
            case 'subtype3': return `button-sq3`;
            case 'subtype4': return `button-sq4`;
            default: return `button-sq1`;
         }
      } else if (this.typeClass === 'btnLink') {
         if (this.themeClass === 'themeB') {
            switch (this.subtypeClass) {
               case 'subtype1': return `button-lk3`;
               case 'subtype2': return `button-lk4`;
               default: return `button-lk3`;
            }
         } else {
            switch (this.subtypeClass) {
               case 'subtype1': return `button-lk1`;
               case 'subtype2': return `button-lk2`;
               default: return `button-lk1`;
            }
         }
      } else if (this.typeClass === 'btnTool') {
         if (this.themeClass === 'themeB') {
            switch (this.subtypeClass) {
               case 'subtype1': return `button-rd4`;
               case 'subtype2': return `button-rd5`;
               case 'subtype3': return `button-rd6`;
               default: return `button-rd4`;
            }
         } else {
            switch (this.subtypeClass) {
               case 'subtype1': return `button-rd1`;
               case 'subtype2': return `button-rd2`;
               case 'subtype3': return `button-rd3`;
               case 'subtype4': return `button-rd7`;
               default: return `button-rd1`;
            }

         }
      }

      return 'button-sq1';
   }


   public onClickEvent(event: any): void {
      this.onClick.emit(event);
   }
}
