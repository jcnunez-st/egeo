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
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
   selector: 'st-input-demo',
   styleUrls: ['st-input-demo.component.scss'],
   templateUrl: 'st-input-demo.component.html'
})
export class StInputDemoComponent {
   demoForm: FormGroup;

   mdModel: string;
   tdModel: string;

   constructor() {
      this.mdModel = 'init value model';
      this.tdModel = 'init value template';

      this.demoForm = new FormGroup({
         mdInput: new FormControl(this.mdModel)
      });
   }

   onSubmit(form: NgForm): void {
      console.log('submit: ', form.value);
   }
}
