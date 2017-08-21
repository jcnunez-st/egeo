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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

import { StHeaderModel } from '../st-header.model';

@Component({
   selector: 'navigation-links',
   styleUrls: ['./navigation-links.component.scss'],
   templateUrl: './navigation-links.component.html'
})
export class NavigationLinksComponent {

   @Input() menu: StHeaderModel[] = [];
   @Input() qaTag: string;

   @Output() positionChange: EventEmitter<number> = new EventEmitter<number>();

   constructor(private _cd: ChangeDetectorRef) {}

   public hasIcon(option: StHeaderModel): boolean {
      return option.icon !== undefined;
   }

   public launchChangeDetector(): void {
      this._cd.markForCheck();
   }

   public onPositionChange(newPosition: number): void {
      this.positionChange.emit(newPosition);
   }

   public isActive(option: StHeaderModel): string {
      if (!option.isActive) {
         return 'sth-header-disable-option';
      } else {
         return '';
      }
   }
}
