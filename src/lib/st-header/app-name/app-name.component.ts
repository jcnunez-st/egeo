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

@Component({
   selector: 'app-name',
   styleUrls: ['./app-name.component.scss'],
   templateUrl: './app-name.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNameComponent {

   @Input() companyName: string | undefined = 'STRATIO';
   @Input() appName: string | undefined;
   @Input() appLogoPath: string | undefined;
   @Input() qaTag: string;

   public showAppName(): boolean {
      return this.appName !== undefined;
   }
}
