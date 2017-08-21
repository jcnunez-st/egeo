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
import {
   Component,
   ChangeDetectionStrategy,
   OnInit,
   Input
} from '@angular/core';
import {
   ControlValueAccessor, FormControl, Validators, ValidatorFn
} from '@angular/forms';

import { StEgeo, StRequired } from '../../decorators/require-decorators';
import { StInputError } from '../../st-input/st-input.error.model';

@Component({
   selector: 'st-form-field',
   templateUrl: './st-form-field.component.html',
   styleUrls: ['./st-form-field.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

@StEgeo()
export class StFormFieldComponent implements ControlValueAccessor, OnInit {
   @Input() @StRequired() schema: any;
   @Input() required: boolean = false;
   @Input() formControl: FormControl = new FormControl();
   @Input() errorMessages: StInputError;

   public type: string;

   private registeredOnChange: (_: any) => void;

   constructor() {
   }

   ngOnInit(): void {
      let validationList: ValidatorFn[] = [];

      this.type = this.schema.value.type === 'string' ? 'text' : this.schema.value.type;
      if (this.required) {
         validationList.push(Validators.required);
      }
      if (this.schema.value.pattern) {
         validationList.push(Validators.pattern(this.schema.value.pattern));
      }

      this.formControl.validator = Validators.compose(validationList);

      if (!this.errorMessages) {
         this.errorMessages = {
            generic: 'Error',
            required: 'This field is required',
            minLength: 'The field min length is ' + this.schema.value.minLength,
            maxLength: 'The field max length is ' + this.schema.value.maxLength,
            min: 'The number has to be higher than ' + this.min,
            max: 'The number has to be minor than ' + this.max,
            pattern: 'Invalid value'
         };
      }
   }

   writeValue(value: any): void {
      this.onChange(value);
   }

   registerOnChange(fn: (_: any) => void): void {
      this.registeredOnChange = fn;
   }

   registerOnTouched(fn: () => void): void {
   }

   onChange(value: any): void {
      if (this.registeredOnChange) {
         this.registeredOnChange(value);
      }
   }

   get min(): number {
      return this.schema.value.exclusiveMinimum ? this.schema.value.minimum + 1 : this.schema.value.minimum;
   }

   get max(): number {
      return this.schema.value.exclusiveMaximum ? this.schema.value.maximum - 1 : this.schema.value.maximum;
   }

   get name(): string {
      return this.schema.key;
   }

   get label(): string {
      return this.schema.value.title;
   }

   get placeholder(): string {
      return this.schema.value.placeholder || '';
   }

   get description(): string {
      return this.schema.value.description;
   }

   get minLength(): number {
      return this.schema.value.minLength;
   }

   get maxLength(): number {
      return this.schema.value.maxLength;
   }


   hasType(type: string): boolean {
      switch (type) {
         case 'input':
            return this.type === 'text' || this.type === 'number';
         default:
            return this.type === type;
      }
   }

}
