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
import { FormGroup } from '@angular/forms';

import { JSON_SCHEMA } from './json-schema';

@Component({
   selector: 'st-form-demo',
   templateUrl: 'st-form-demo.html'
})
export class StFormDemoComponent {
   public jsonSchema: any;
   public form: FormGroup;

   constructor() {
      this.jsonSchema = JSON_SCHEMA;
      this.form = new FormGroup({});
   }


   public showFormStatus(): void {
      console.log({valid: this.form.valid, model: this.form.value});
   }
}
