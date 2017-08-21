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
   Input
} from '@angular/core';

import { StFormLabelStatus } from './st-form-label-status.enum';
import { StEgeo, StRequired } from '../../../decorators/require-decorators';

@Component({
   selector: 'st-form-label',
   templateUrl: './st-form-label.component.html',
   styleUrls: ['./st-form-label.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

@StEgeo()
export class StFormLabelComponent {
   @Input() label: string = '';
   @Input() @StRequired() qaTag: string;
   @Input() contextualHelp: string;
   @Input() status: StFormLabelStatus;
   @Input() name: string;
   @Input() showTooltipOnClick: boolean = true;
   @Input() labelPosition: 'top' | 'right' | 'left' = 'top';

   getStatusClass(): string {
      switch (this.status) {
         case StFormLabelStatus.DISABLED:
            return 'disabled';
         case StFormLabelStatus.ERROR:
            return 'error';
         case StFormLabelStatus.FOCUS:
            return 'active';
         default:
            return '';
      }
   }

   onTooltipClick(event: MouseEvent): void {
      event.stopPropagation();
      event.preventDefault();
   }

   getPositionClass(): string {
      return `st-form-label__label--${this.labelPosition} sth-form-label__label--${this.labelPosition}`;
   }
}
