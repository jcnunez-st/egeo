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
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StFormBaseComponent } from './st-form-base.component';
import { CreateProvider } from './st-form-base.provider';


@Component({
   providers: [CreateProvider(StFormBaseInstance)],
   selector: 'st-form-base-instance',
   template:
      `<input
            #formElementRef
            class="st-input"
            (blur)="onBlur($event)"
            (focus)="onFocus($event)"
            [attr.id]="idSuffix('-input')"
            [attr.name]="name"
            [attr.placeholder]="placeholder"
            [attr.required]="required"
            [attr.type]="type"
            [value]="value">`
})
class StFormBaseInstance extends StFormBaseComponent { }

const labelContent: string = 'label content';
const tooltipContent: string = 'tooltip content';

let component: StFormBaseInstance;
let fixture: ComponentFixture<StFormBaseInstance>;
let formElement: HTMLInputElement;
let nativeElement: Element;

describe('StFormBase', () => {

   beforeEach(async(() => {
      TestBed
      .configureTestingModule({
         declarations: [
            StFormBaseComponent,
            StFormBaseInstance
         ]
      })
      .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StFormBaseInstance);
      component = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
      formElement = nativeElement.querySelector('input');
   });

   it('Form element should have a name', () => {
      component.name = 'Form element name';
      fixture.detectChanges();
      expect(formElement.name).toContain('Form element name');
   });

   it('Form element should have a placeholder', () => {
      component.placeholder = 'Placeholder sample';
      fixture.detectChanges();
      expect(formElement.placeholder).toContain('Placeholder sample');
   });

   it('Form element should have a value', () => {
      component.value = 'Value sample';
      fixture.detectChanges();
      expect(formElement.value).toContain('Value sample');
   });

});



@Component({
   template:
      `<form>
         <st-form-base-instance></st-form-base-instance>
      </form>`
})
class TestStFormBaseComponent { }
