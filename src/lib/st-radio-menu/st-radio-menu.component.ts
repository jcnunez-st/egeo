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
   ChangeDetectionStrategy,
   Component,
   EventEmitter,
   Input,
   Output
} from '@angular/core';
import { StRadioMenuOption } from './st-radio-menu-option.interface';
@Component({
   selector: 'st-radio-menu',
   templateUrl: './st-radio-menu.component.html',
   styleUrls: ['./st-radio-menu.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   host: {
      '[class]': 'theme'
   }
})
export class StRadioMenuComponent {
   @Input() activeOption: StRadioMenuOption;
   @Input() options: StRadioMenuOption[];
   @Input() qaTag: string;
   @Input() theme: string;
   @Output() changedOption: EventEmitter<any> = new EventEmitter<any>();

   constructor() {}

   isActive(option: StRadioMenuOption): boolean {
      return (
         this.activeOption !== undefined &&
         this.activeOption.value === option.value
      );
   }

   activateOption(option: StRadioMenuOption): void {
      this.activeOption = option;
      this.changedOption.emit(option);
   }

   checkedOption(option: StRadioMenuOption): boolean {
      if (!this.activeOption) {
         return false;
      }

      if (this.activeOption.value === option.value) {
         return true;
      }
      return false;
   }
}
