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
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { StSubMenuModel } from '../st-header.model';

@Component({
   selector: 'submenu',
   styleUrls: ['./submenu.component.scss'],
   templateUrl: './submenu.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmenuComponent {

   @Input() submenu: StSubMenuModel[] = [];
   @Input() qaTag: string;
   @Input() offset: number = 0;

   public getOffset(): Object {
      return {
         'margin-left': `${this.offset}px`
      };
   }

   public isActive(option: StSubMenuModel): string {
      if (!option.isActive) {
         return 'sth-header-submenu-disable-option';
      } else {
         return '';
      }
   }
}
