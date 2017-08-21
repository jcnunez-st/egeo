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
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { StDropDownMenuItem } from '@stratio/egeo';

@Component({
   selector: 'select-demo',
   templateUrl: 'select-demo.html',
   styleUrls: ['./select-demo.scss']
})

export class SelectDemoComponent {
   @ViewChild('templateDrivenForm') public templateDrivenForm: NgForm;

   public options: StDropDownMenuItem[] = [];
   public forceValidations: boolean = false;
   public isDisabled: boolean = false;
   public errorMessage: string = 'Error, this field is required';
   public model: any = {
      option1: null,
      option2: null
   };
   public reactiveForm: FormGroup; // our model driven form

   constructor(private _fb: FormBuilder) {
      for (let i: number = 0; i < 10; i++) {
         this.options.push({
            label: `option-${i}`,
            value: i
         });
      }
      this.model.option2 = this.options[2];

      this.reactiveForm = this._fb.group({
         'option1': [this.model.option1, [Validators.required]],
         'option2': [this.model.option2, [Validators.required]]
      });
   }

   changeForceValidations(): void {
      this.forceValidations = true;
   }

   changeDisabled(): void {
      this.isDisabled = !this.isDisabled;
      if (this.isDisabled) {
         this.reactiveForm.get('option1').disable();
         this.templateDrivenForm.form.get('option1-template').disable();
      } else {
         this.reactiveForm.get('option1').enable();
         this.templateDrivenForm.form.get('option1-template').enable();
      }
   }

   onSubmitReactiveForm(): void {
      this.model.option1 = this.reactiveForm.value.option1;
      this.model.option2 = this.reactiveForm.value.option2;
   }
}
