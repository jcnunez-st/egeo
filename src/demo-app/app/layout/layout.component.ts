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
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { MenuOption, OPTIONS } from './layout.menu';

@Component({
   selector: 'layout',
   templateUrl: './layout.component.html',
   styles: [ './layout.scss']
})
export class LayoutComponent {
   public options: string[] = OPTIONS.map(option => option.name);
   public selected: string = '';

   constructor(private _router: Router, private _activeRoute: ActivatedRoute) {
      this._router.events.subscribe(change => this.changeRoute(change));
   }

   public changeOption(selected: string): void {
      let option: MenuOption = OPTIONS.find(opt => opt.name.toLocaleLowerCase() === selected.toLocaleLowerCase());
      if (option) {
         this._router.navigate([option.route]);
      }
   }

   private changeRoute(event: any): void {
      if (event instanceof NavigationEnd) {
         let urlParts: string[] = event.urlAfterRedirects.split('/');
         let option: MenuOption = OPTIONS.find(opt => opt.route === urlParts[urlParts.length - 1]);
         if (option) {
            this.selected = option.name;
         }
      }
   }
}
