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
import { TranslateableElement } from '../../egeo-resolver/egeo-resolve-model';

export interface StFormError {
   generic?: string;
   max?: string;
   maxLength?: string;
   min?: string;
   minLength?: string;
   pattern?: string;
   required?: string;
   type?: string;
}

export interface StFormErrorSchema {
   generic?: TranslateableElement;
   max?: TranslateableElement;
   maxLength?: TranslateableElement;
   min?: TranslateableElement;
   minLength?: TranslateableElement;
   pattern?: TranslateableElement;
   required?: TranslateableElement;
   type?: TranslateableElement;
}

