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
import { Component, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CHECKBOX_CONTROL_ACCESSOR: any = {
   provide: NG_VALUE_ACCESSOR,
   // tslint:disable-next-line:no-use-before-declare
   useExisting: forwardRef(() => StCheckboxComponent),
   multi: true
};

@Component({
   selector: 'st-checkbox',
   templateUrl: './st-checkbox.component.html',
   providers: [CHECKBOX_CONTROL_ACCESSOR],
   styleUrls: ['./st-checkbox.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class StCheckboxComponent implements ControlValueAccessor {

   @Input() get checked(): boolean {
      return this._checked;
   }

   set checked(checked: boolean) {
      if (checked !== this.checked) {
         this._checked = checked;
         this._changeDetectorRef.markForCheck();
      }
   }

   @Input() name: string;
   @Input() qaTag: string;
   @Input() disabled: boolean;
   @Input() required: boolean;
   @Input() readonly: boolean;
   @Input() value: any;
   @Output() change: EventEmitter<any> = new EventEmitter<any>();

   private _value: string;
   private _values: any;
   private _checked: boolean = false;

   constructor(
      private _changeDetectorRef: ChangeDetectorRef
   ) {

   }

   _controlValueAccessorChangeFn: (value: any) => void = (value) => { };

   onTouched: () => any = () => { };

   handleClick(): void {
      if (!this.readonly) {
         if (!this.disabled) {
            this._checked = !this._checked;
            this._controlValueAccessorChangeFn(this._checked);
            this.change.emit({ checked: this.checked, value: this.value });
         }
      }
   }

   handleChange($event: Event): void {
      $event.stopPropagation();
   }

   writeValue(value: any): void {
      this._checked = value;
   }

   registerOnChange(fn: (value: any) => void): void {
      this._controlValueAccessorChangeFn = fn;
   }

   registerOnTouched(fn: any): void {
      this.onTouched = fn;
   }

   setDisabledState(isDisabled: boolean): void {
      this.disabled = isDisabled;
      this._changeDetectorRef.markForCheck();
   }

}
