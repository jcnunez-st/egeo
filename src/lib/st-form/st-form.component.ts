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
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
   selector: 'st-form',
   templateUrl: './st-form.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class StFormComponent implements OnInit {
   @Input() schema: any;
   @Input() form: FormGroup = new FormGroup({});
   @Input() model: any = {};

   ngOnInit(): void {
      Object.keys(this.schema.properties).forEach(propertyName => {
         let property: any = this.schema.properties[propertyName];
         let formControl: FormControl | FormArray;
         if (property.default && this.model[propertyName] === undefined) {
            this.model[propertyName] = property.default;
         }
         formControl = new FormControl(this.model[propertyName] || '');
         this.form.addControl(propertyName, formControl);
      });
   }

   isRequired(propertyName: string): boolean {
      return propertyName && this.schema.required && this.schema.required.indexOf(propertyName) !== -1;
   }
}
