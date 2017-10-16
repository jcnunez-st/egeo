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

   mdInputControl: FormControl;
   mdModel: string;

   tdModel: string;
   tdStInputModel: string;

   constructor() {
      this.mdInputControl = new FormControl();
      this.demoForm = new FormGroup({
         model1: this.mdInputControl
      });

      this.mdModel = '';
      this.tdStInputModel = 'init value';
      this.tdModel = '';
   }

   onSubmit(form: NgForm): void {
      console.log('submit: ', form.value);
   }
}
