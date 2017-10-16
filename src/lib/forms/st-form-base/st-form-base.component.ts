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
import { Component, ElementRef, ExistingProvider, HostBinding, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, ValidatorFn } from '@angular/forms';

@Component({})
export class StFormBaseComponent implements ControlValueAccessor {

   @HostBinding('class.active') classActive: boolean = false;
   @HostBinding('class.disabled') classDisabled: boolean = false;
   @HostBinding('class.error') classError: boolean = false;

   @Input() control: FormControl;
   @Input() label: string;
   @Input() model: string;
   @Input() name: string;
   @Input() placeholder: string;
   @Input() required: string;
   @Input() tooltip: string;
   @Input() validation: ValidatorFn[];

   private host: any;

   private _value: any;
   get value(): any {
      return this._value;
   }
   set value(value: any) {
      if (value !== this._value) {
         this._value = value;
         this.onChange(value);
      }
   }

   constructor(private el: ElementRef) {
      this.control =  new FormControl();
      this.host = this.el.nativeElement;
   }

   getId(sufix?: string): string {
      return this.host.id ? this.host.id + sufix : undefined;
   }

   onChange = (_: any) => {};

   onTouched = () => {};

   registerOnChange(fn: (_: any) => void): void {
      this.onChange = fn;
   }

   registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
   }

   writeValue(value: any): void {
      this._value = value;
      this.onChange(value);
   }
}
