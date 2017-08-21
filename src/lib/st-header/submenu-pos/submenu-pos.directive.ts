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
import { Directive, ElementRef, EventEmitter, Input, OnChanges, AfterViewInit, Output, SimpleChange } from '@angular/core';

@Directive({ selector: '[submenuPos]' })

export class SubmenuPosDirective implements OnChanges, AfterViewInit {

   @Input() submenuPosIsActive: boolean;
   @Output() positionChange: EventEmitter<number> = new EventEmitter<number>();

   constructor(private el: ElementRef) { }

   ngAfterViewInit(): void {
      if (this.submenuPosIsActive) {
         this.positionChange.emit(this.el.nativeElement.getBoundingClientRect().left);
      }
   }

   ngOnChanges(change: any): void {
      if (this.submenuPosIsActive) {
         this.positionChange.emit(this.el.nativeElement.getBoundingClientRect().left);
      }
   }
}
