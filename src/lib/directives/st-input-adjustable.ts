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
import {
   AfterViewInit,
   Directive,
   ElementRef,
   Input,
   Renderer
} from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
   selector: '[StInputAdjustable]'
})
export class StInputAdjustable implements AfterViewInit {
   @Input() placeholder: string;

   private text: string;

   constructor(
      private el: ElementRef,
      private ngModel: NgModel,
      private renderer: Renderer
   ) {}

   ngAfterViewInit(): void {
      this.ngModel.valueChanges.subscribe(value => {
         this.text = value || this.placeholder;

         if (!value) {
            this.el.nativeElement.value = null;
            this.el.nativeElement.placeholder = this.placeholder;
         }

         if (this.el.nativeElement.parentNode.querySelector('.title-hidden')) {
            this.el.nativeElement.parentNode.removeChild(
               this.el.nativeElement.parentNode.querySelector('.title-hidden')
            );
         }

         this.el.nativeElement.parentNode.insertAdjacentHTML(
            'beforeend',
            '<span class="title-hidden">' + this.text + '</span>'
         );

         this.el.nativeElement.parentNode.querySelector(
            '.title-hidden'
         ).style.visibility =
            'hidden';

         this.el.nativeElement.parentNode.querySelector(
            '.title-hidden'
         ).style.position =
            'absolute';
         this.el.nativeElement.parentNode.querySelector(
            '.title-hidden'
         ).style.textTransform =
            'none';

         this.el.nativeElement.parentNode.querySelector(
            '.title-hidden'
         ).style.whiteSpace =
            'nowrap';

         this.el.nativeElement.parentNode.querySelector(
            '.title-hidden'
         ).style.width =
            'auto';

         this.el.nativeElement.parentNode.querySelector(
            '.title-hidden'
         ).style.height =
            'auto';

         this.el.nativeElement.style.width =
            this.el.nativeElement.parentNode.querySelector('.title-hidden')
               .offsetWidth +
            10 +
            'px';
      });
   }
}
