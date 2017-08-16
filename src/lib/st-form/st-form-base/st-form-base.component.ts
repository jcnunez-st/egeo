/*
 * Copyright (C) 2016 Stratio (http://stratio.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
   ChangeDetectionStrategy,
   ChangeDetectorRef,
   Component,
   EventEmitter,
   forwardRef,
   Input,
   OnChanges,
   OnDestroy,
   OnInit,
   Output,
   ViewChildren
} from '@angular/core';
import {
   ControlValueAccessor,
   FormControl,
   NG_VALIDATORS,
   NG_VALUE_ACCESSOR,
   ValidatorFn,
   Validators
} from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { StFormError } from '../st-form-error/st-form-error.model';

@Component({
   providers: [
      { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StFormBaseComponent), multi: true },
      { provide: NG_VALIDATORS, useExisting: forwardRef(() => StFormBaseComponent), multi: true }
   ],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class StFormBaseComponent implements ControlValueAccessor, OnChanges, OnDestroy, OnInit {

   @Input() contextualHelp: string;
   @Input() errors: StFormError;
   @Input() fieldType: 'text' | 'number' | 'password';
   @Input() forceValidations: boolean;
   @Input() isFocused: boolean;
   @Input() label: string;
   @Input() name: string;
   @Input() max: number;
   @Input() maxLength: number;
   @Input() min: number;
   @Input() placeholder: string;
   @Input() qaTag: string;
   @Input() readonly: boolean;

   @Input()
   get value(): any {
      return this._value;
   }

   set value(value: any) {
      this._value = value;
   }

   @Output() change: EventEmitter<any>;

   @ViewChildren('input') vc: any;

   public errorMessage: string;
   public focus: boolean;
   public internalControl: FormControl;
   public isDisabled: boolean;

   private _value: any;
   private internalInputModel: any;
   private sub: Subscription;
   private valueChangeSub: Subscription;

   constructor(private _cd: ChangeDetectorRef) {
      this.fieldType = 'text';
      this.forceValidations = false;
      this.isFocused = false;
      this.label = '';
      this.name = '';
      this.placeholder = '';
      this.readonly = false;

      this.change = new EventEmitter<any>();

      this.errorMessage = undefined;
      this.focus = false;
      this.isDisabled = false;
      this.internalInputModel = '';
   }

   onChange = (_: any) => { };
   onTouched = () => { };


   validate(control: FormControl): any {
      if (this.sub) {
         this.sub.unsubscribe();
      }
      this.sub = control.statusChanges.subscribe(() => this.checkErrors(control));
   }

   ngOnChanges(change: any): void {
      if (this.forceValidations) {
         this.writeValue(this.internalControl.value);
      }
      this._cd.markForCheck();
   }

   ngOnInit(): void {
      this.internalControl = new FormControl(this.internalInputModel);
      this.valueChangeSub = this.internalControl.valueChanges.subscribe((value) => this.onChange(value));
   }

   ngAfterViewInit(): void {
      if (this.isFocused) {
         this.focus = true;
         this.vc.first.nativeElement.focus();
      }
   }

   ngOnDestroy(): void {
      if (this.valueChangeSub) {
         this.valueChangeSub.unsubscribe();
      }
      if (this.sub) {
         this.sub.unsubscribe();
      }
   }

   // When value is received from outside
   writeValue(value: any): void {
      this.internalInputModel = value;
      this.internalControl.setValue(value);
   }

   // Registry the change function to propagate internal model changes
   registerOnChange(fn: (_: any) => void): void {
      this.onChange = fn;
   }

   // Registry the touch function to propagate internal touch events TODO: make this function.
   registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
   }

   setDisabledState(disable: boolean): void {
      this.isDisabled = disable;
      if (this.isDisabled && this.internalControl && this.internalControl.enabled) {
         this.internalControl.disable();
      } else if (!this.isDisabled && this.internalControl && this.internalControl.disabled) {
         this.internalControl.enable();
      }
      this._cd.markForCheck();
   }

   showError(): boolean {
      return this.errorMessage !== undefined && (!this.internalControl.pristine || this.forceValidations) && !this.focus && !this.isDisabled;
   }

   /** Style functions */
   getBarType(): string {
      return this.showError() ? 'st-input-error-bar sth-input-error-bar' : 'st-input-normal-bar sth-input-normal-bar';
   }

   onFocus(event: Event): void {
      this.focus = true;
   }

   onFocusOut(event: Event): void {
      this.focus = false;
   }

   onChangeEvent(event: Event): void {
      this._value = this.vc.first.nativeElement.value;
      this.change.emit(this.value);
      event.stopPropagation();
      event.preventDefault();
   }

   // When status change call this function to check if have errors
   private checkErrors(control: FormControl): void {
      let errors: { [key: string]: any } = control.errors;
      this.errorMessage = this.getErrorMessage(errors);
      this._cd.markForCheck();
   }

   // Get error message in function of error list.
   private getErrorMessage(errors: { [key: string]: any }): string {
      if (!errors) {
         return undefined;
      }

      if (!this.errors) {
         return '';
      }

      if (errors.hasOwnProperty('required')) {
         return this.errors.required || this.errors.generic || '';
      }
      if (errors.hasOwnProperty('fieldType')) {
         return this.errors.type || this.errors.generic || '';
      }
      if (errors.hasOwnProperty('minlength')) {
         return this.errors.minLength || this.errors.generic || '';
      }
      if (errors.hasOwnProperty('maxlength')) {
         return this.errors.maxLength || this.errors.generic || '';
      }
      if (errors.hasOwnProperty('pattern')) {
         return this.errors.pattern || this.errors.generic || '';
      }
      if (errors.hasOwnProperty('min')) {
         return this.errors.min || this.errors.generic || '';
      }
      if (errors.hasOwnProperty('max')) {
         return this.errors.max || this.errors.generic || '';
      }
      return '';
   }
}
