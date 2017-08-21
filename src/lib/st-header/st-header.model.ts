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
import { TranslateableElement } from '../utils/egeo-resolver/egeo-resolve-model';

export interface StHeaderModel {
   icon?: string;
   label: string;
   link: string;
   isActive: boolean;
   subMenus: StSubMenuModel[];
   notifications?: number;
}

export interface StSubMenuModel {
   label: string;
   link: string;
   isActive: boolean;
}

/** For translate service */
export interface StHeaderModelSchema {
   icon?: string;
   label: TranslateableElement;
   link: string;
   isActive: boolean;
   subMenus: StSubMenuModelSchema[];
   notifications?: number;
}

export interface StSubMenuModelSchema {
   label: TranslateableElement;
   link: string;
   isActive: boolean;
}

export interface StHeaderUserMenuModel {
   logoutLabel: string;
   userName: string;
   logoutPath: string;
}

export interface StHeaderUserMenuModelSchema {
   logoutLabel: TranslateableElement;
   userName: string;
   logoutPath: string;
}
