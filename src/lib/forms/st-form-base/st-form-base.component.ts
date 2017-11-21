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
   ChangeDetectorRef,
   Component,
   ElementRef,
   EventEmitter,
   HostBinding,
   HostListener,
   Input,
   OnInit,
   Output,
   Renderer2,
   ViewChild
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
   selector: 'st-form-base',
   template: ''
})
export class StFormBaseComponent implements ControlValueAccessor, OnInit {

   @Input() label: string;
   @Input() name: string;
   @Input() placeholder: string;
   @Input() tooltip: string;
   @Input() type: string;

   @Input() set autofocus(autofocus: any) {
      this._autofocus = autofocus !== undefined;
   }
   @Input() set disabled(disabled: any) {
      this._disabled = disabled;
      this.classDisabled = disabled !== undefined;
      this.renderer.setProperty(this.formElementRef.nativeElement, 'disabled', disabled);
   }
   @Input() set required(required: any) {
      this._required = required;
      this.renderer.setProperty(this.formElementRef.nativeElement, 'required', required);
   }

   @Output() blur: EventEmitter<FocusEvent>;
   @Output() focus: EventEmitter<FocusEvent>;

   @HostBinding('class.active') classActive: boolean;
   @HostBinding('class.disabled') classDisabled: boolean;
   @HostBinding('class.error') classError: boolean;
   @HostBinding('class.st-form-base') classStFormBase: boolean;

   @ViewChild('formElementRef') formElementRef: ElementRef;

   private _autofocus: boolean;
   private _disabled: any;
   private _onChange: (_: any) => void;
   private _onTouched: any;
   private _required: any;
   private _value: any;

   @HostListener('change', ['$event']) onChange(event: any): void {
      this._onChange(event.target.value);
   }

   @HostListener('blur') onTouched(): void {
      this._onTouched();
   }

   get value(): any {
      return this._value;
   }

   set value(value: any) {
      if (value !== this._value) {
         this._value = value;
         this._onChange(value);
      }
   }


   constructor(protected cdr: ChangeDetectorRef, protected elementRef: ElementRef, protected renderer: Renderer2) {
      this.blur = new EventEmitter();
      this.focus = new EventEmitter();

      this.classActive = false;
      this.classDisabled = false;
      this.classError = false;
      this.classStFormBase = true;

      this._onChange = (_: any) => {};
      this._onTouched = () => {};
   }

   ngOnInit(): void {
      this.cdr.detectChanges();
      if (this._autofocus) {
         this.formElementRef.nativeElement.focus();
      }
   }

   idSuffix(suffix?: string): string {
      return this.elementRef.nativeElement.id ? this.elementRef.nativeElement.id + suffix : undefined;
   }

   onBlur(event: FocusEvent): void {
      this.classActive = false;
      this.blur.emit(event);
   }

   onFocus(event: FocusEvent): void {
      this.classActive = true;
      this.focus.emit(event);
   }


   // ControlValueAccessor methods
   writeValue(value: any): void {
      if (value !== this._value) {
         this.renderer.setProperty(this.formElementRef.nativeElement, 'value', value);
         this.value = value;
      }
   }

   registerOnChange(fn: (_: any) => void): void {
      this._onChange = fn;
   }

   registerOnTouched(fn: any): void {
      this._onTouched = fn;
   }

   setDisabledState(isDisabled: boolean): void {
      this.classDisabled = true;
      this.renderer.setProperty(this.formElementRef.nativeElement, 'disabled', isDisabled);
   }
}
