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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, Renderer } from '@angular/core';
import { Router } from '@angular/router';

import { EventWindowManager } from '../../utils/event-window-manager';
import { StHeaderUserMenuModel } from '../st-header.model';

@Component({
   selector: 'user-menu',
   styleUrls: ['./user-menu.component.scss'],
   templateUrl: './user-menu.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuComponent extends EventWindowManager implements OnDestroy {

   @Input() userMenuModel: StHeaderUserMenuModel;
   @Input() qaTag: string;

   constructor(
      private router: Router,
      private renderer: Renderer,
      private cd: ChangeDetectorRef,
      private elementRef: ElementRef
   ) {
      super(renderer, cd, elementRef);
   }


   public changeMenuState(event: MouseEvent): void {
      this.openElement();
   }

   public navigateToLogout(): void {
      this.router.navigate([`/${this.userMenuModel.logoutPath}`]);
      this.closeElement();
   }

   public ngOnDestroy(): void {
      this.closeElement();
   }
}
