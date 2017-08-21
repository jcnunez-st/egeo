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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, Renderer} from '@angular/core';

import { EventWindowManager } from '../utils/event-window-manager';

@Component({
   selector: 'st-tooltip',
   templateUrl: './st-tooltip.component.html',
   styleUrls: ['./st-tooltip.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StTooltip extends EventWindowManager implements OnDestroy {

   @Input() text: string = '';
   @Input() showOnClick: boolean;
   @Input() qaTag: string;

   constructor(private elementRef: ElementRef, private renderer: Renderer, private cd: ChangeDetectorRef) {
      super(renderer, cd, elementRef);
   }

   openTooltip(): void {
      this.openElement();
   }

   openTooltipOnHover(): void {
      if (!this.showOnClick) {
         this.forceCloseOther();
         this.isActive = true;
      }
   }

   closeTooltipOnHover(): void {
      if (!this.showOnClick) {
         this.isActive = false;
      }
   }

   ngOnDestroy(): void {
      this.closeElement();
   }

}
