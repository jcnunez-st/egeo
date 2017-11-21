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
import { DebugElement, NO_ERRORS_SCHEMA, Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { cloneDeep as _cloneDeep } from 'lodash';

import { StDropDownMenuItem, StDropDownMenuGroup } from '../st-dropdown-menu/st-dropdown-menu.interface';
import { StSelectComponent } from './st-select';
import { StSelectModule } from './st-select.module';


const simpleItems: StDropDownMenuItem[] = [
   { label: 'example 1', value: 1 },
   { label: 'example 2', value: 2 },
   { label: 'example 3', value: 3 },
   { label: 'example 4', value: 4 },
   { label: 'example 5', value: 5 },
   { label: 'example 6', value: 6 },
   { label: 'example 7', value: 7 },
   { label: 'example 8', value: 8 },
   { label: 'example 9', value: 9 },
   { label: 'example 10', value: 10 },
   { label: 'example 11', value: 11 }
];

const simpleItems2: StDropDownMenuItem[] = [
   { label: 'test 1', value: 11 },
   { label: 'test 2', value: 12 },
   { label: 'test 3', value: 13 },
   { label: 'test 4', value: 14 },
   { label: 'test 5', value: 15 },
   { label: 'test 6', value: 16 }
];

const groupOptions: StDropDownMenuGroup[] = [
   { title: 'Group 1', items: simpleItems },
   { title: 'Group 2', items: simpleItems2 }
];

describe('StSelectComponent', () => {
   let fixture: ComponentFixture<StSelectComponent>;
   let comp: StSelectComponent;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [StSelectComponent],
         schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StSelectComponent);
      comp = fixture.componentInstance;
   });

   it('Should init correctly', () => {
      (fixture.elementRef.nativeElement as HTMLElement).id = null;
      fixture.detectChanges();

      expect(comp.placeholder).toEqual('');
      expect(comp.name).toEqual('');
      expect(comp.label).toEqual('');
      expect(comp.tooltip).toBeNull();
      expect(comp.errorMessage).toBeUndefined();
      expect(comp.selected).toBeUndefined();
      expect(comp.expandedMenu).toBeFalsy();

      expect(comp.disabled).toBeFalsy();
      expect(comp.options).toEqual([]);
      expect(comp.selectedValue).toEqual('');
      expect(comp.disableValue).toBeNull();
      expect(comp.hasLabel).toBeFalsy();
      expect(comp.hasError).toBeFalsy();

      expect(comp.selectId).toBeNull();
      expect(comp.inputId).toBeNull();
      expect(comp.labelId).toBeNull();
      expect(comp.optionsId).toBeNull();
      expect(comp.inputName).toBeNull();

   });

   it('Should propagate id to internal elements', () => {
      const id: string = 'test-id';
      (fixture.elementRef.nativeElement as HTMLElement).id = id;
      comp.label = 'Test Label';
      fixture.detectChanges();

      const input: HTMLElement = fixture.debugElement.query(By.css('input')).nativeElement;
      const label: HTMLElement = fixture.debugElement.query(By.css('label')).nativeElement;
      const dropdownMenu: HTMLElement = fixture.debugElement.query(By.css('st-dropdown-menu')).nativeElement;

      expect(comp.selectId).toEqual(id);

      expect(comp.inputId).toEqual(`${id}-input`);
      expect(input.getAttribute('id')).toEqual(`${id}-input`);

      expect(comp.labelId).toEqual(`${id}-label`);
      expect(label.getAttribute('id')).toEqual(`${id}-label`);

      expect(comp.optionsId).toEqual(`${id}-options`);
      expect(dropdownMenu.getAttribute('id')).toEqual(`${id}-options`);
   });

   it('Should have a placeholder', () => {
      comp.placeholder = 'Placeholder sample';
      fixture.detectChanges();

      const input: HTMLElement = fixture.debugElement.query(By.css('input')).nativeElement;
      expect(input.getAttribute('placeholder')).toContain('Placeholder sample');
   });

   it('Should set a name', () => {
      comp.name = 'test-name';
      fixture.detectChanges();

      const input: HTMLElement = fixture.debugElement.query(By.css('input')).nativeElement;
      expect(comp.inputName).toContain(comp.name);
      expect(input.getAttribute('name')).toContain(comp.name);
   });

   it('Should not have a label', () => {
      fixture.detectChanges();
      let label: DebugElement = fixture.debugElement.query(By.css('label'));
      expect(label).toBeNull();
      expect(comp.hasLabel).toBeFalsy();
   });

   it('Should have a label and tooltip', () => {
      comp.label = 'test label';
      comp.tooltip = 'Test help';
      fixture.detectChanges();

      const label: DebugElement = fixture.debugElement.query(By.css('label'));

      expect(comp.hasLabel).toBeTruthy();
      expect(label).toBeDefined();
      expect(label.nativeElement).toBeDefined();
      expect((label.nativeElement as HTMLLabelElement).textContent).toEqual(comp.label);
      expect((label.nativeElement as HTMLLabelElement).title).toEqual(comp.tooltip);
   });

   it('Should change active on click on label', () => {
      spyOn(comp.expand, 'emit');
      const id: string = 'test-id';
      (fixture.elementRef.nativeElement as HTMLElement).id = id;
      comp.options = simpleItems;
      comp.label = 'Test';
      fixture.detectChanges();

      expect(comp.expandedMenu).toBeFalsy();
      expect(comp.expand.emit).not.toHaveBeenCalled();
      const label: DebugElement = fixture.debugElement.query(By.css('label'));
      (label.nativeElement as HTMLLabelElement).click();
      fixture.detectChanges();
      expect(comp.expandedMenu).toBeTruthy();
      expect(comp.expand.emit).toHaveBeenCalled();
   });

   it('Should change active on click on input', () => {
      spyOn(comp.expand, 'emit');
      const id: string = 'test-id';
      (fixture.elementRef.nativeElement as HTMLElement).id = id;
      comp.options = simpleItems;
      fixture.detectChanges();

      expect(comp.expandedMenu).toBeFalsy();
      expect(comp.expand.emit).not.toHaveBeenCalled();
      const input: DebugElement = fixture.debugElement.query(By.css('input'));
      (input.nativeElement as HTMLInputElement).click();
      fixture.detectChanges();
      expect(comp.expandedMenu).toBeTruthy();
      expect(comp.expand.emit).toHaveBeenCalled();
   });

   it('Should change active on click on arrow', () => {
      spyOn(comp.expand, 'emit');
      const id: string = 'test-id';
      (fixture.elementRef.nativeElement as HTMLElement).id = id;
      comp.options = simpleItems;
      fixture.detectChanges();

      expect(comp.expandedMenu).toBeFalsy();
      expect(comp.expand.emit).not.toHaveBeenCalled();
      const icon: DebugElement = fixture.debugElement.query(By.css('i'));
      (icon.nativeElement as HTMLElement).click();
      fixture.detectChanges();
      expect(comp.expandedMenu).toBeTruthy();
      expect(comp.expand.emit).toHaveBeenCalled();
   });

   it('Should change active on press enter', () => {
      spyOn(comp.expand, 'emit');
      const id: string = 'test-id';
      (fixture.elementRef.nativeElement as HTMLElement).id = id;
      comp.options = simpleItems;
      fixture.detectChanges();

      expect(comp.expandedMenu).toBeFalsy();
      expect(comp.expand.emit).not.toHaveBeenCalled();
      const div: DebugElement = fixture.debugElement.query(By.css('.button-container'));

      div.triggerEventHandler('keypress', { keyCode: 13 });
      fixture.detectChanges();
      expect(comp.expandedMenu).toBeTruthy();
      expect(comp.expand.emit).toHaveBeenCalled();

      div.triggerEventHandler('keypress', { keyCode: 24 });
      fixture.detectChanges();
      expect(comp.expandedMenu).toBeTruthy();
      expect(comp.expand.emit).toHaveBeenCalled();
      expect(comp.expand.emit).toHaveBeenCalledTimes(1);
   });

   it('Should change active on click outside', () => {
      spyOn(comp.expand, 'emit');
      const id: string = 'test-id';
      (fixture.elementRef.nativeElement as HTMLElement).id = id;
      comp.options = simpleItems;
      fixture.detectChanges();

      expect(comp.expandedMenu).toBeFalsy();
      expect(comp.expand.emit).not.toHaveBeenCalled();
      const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
      input.click();
      fixture.detectChanges();
      expect(comp.expandedMenu).toBeTruthy();
      expect(comp.expand.emit).toHaveBeenCalled();
      expect(comp.expand.emit).toHaveBeenCalledWith(true);

      input.parentElement.parentElement.click();
      expect(comp.expandedMenu).toBeFalsy();
      expect(comp.expand.emit).toHaveBeenCalled();
      expect(comp.expand.emit).toHaveBeenCalledTimes(2);
      expect(comp.expand.emit).toHaveBeenCalledWith(false);
   });

   it('Should change input focus on click on label', () => {
      const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
      spyOn(input, 'focus');
      spyOn(input, 'blur');
      const id: string = 'test-id';
      (fixture.elementRef.nativeElement as HTMLElement).id = id;
      comp.label = 'Test';
      comp.options = simpleItems;
      fixture.detectChanges();

      expect(comp.expandedMenu).toBeFalsy();
      expect(input.focus).not.toHaveBeenCalled();
      expect(input.blur).not.toHaveBeenCalled();

      const label: HTMLLabelElement = fixture.debugElement.query(By.css('label')).nativeElement;
      label.click();
      fixture.detectChanges();
      expect(comp.expandedMenu).toBeTruthy();
      expect(input.focus).toHaveBeenCalled();
      expect(input.blur).not.toHaveBeenCalled();

      label.click();
      fixture.detectChanges();
      expect(input.blur).toHaveBeenCalled();
   });

   it('Should preselect an option with selected property', () => {
      const id: string = 'test-id';
      (fixture.elementRef.nativeElement as HTMLElement).id = id;
      const options: StDropDownMenuItem[] = _cloneDeep(simpleItems);
      options[3].selected = true;
      comp.options = options;
      fixture.detectChanges();

      expect(comp.selected).toEqual(comp.options[3]); // Select element
      expect(comp.options[3].selected).toBeFalsy(); // Remove selected
   });

   it('Should preselect an option of group with selected property', () => {
      const id: string = 'test-id';
      (fixture.elementRef.nativeElement as HTMLElement).id = id;
      const options: StDropDownMenuGroup[] = _cloneDeep(groupOptions);
      options[0].items[3].selected = true;
      comp.options = options;
      fixture.detectChanges();

      expect(comp.selected).toEqual(comp.options[0].items[3]); // Select element
      expect(comp.options[0].items[3].selected).toBeFalsy(); // Remove selected
   });

   it('Should try to select an unknown type of option', () => {
      const id: string = 'test-id';
      (fixture.elementRef.nativeElement as HTMLElement).id = id;
      const options: any = { test: 'a', selected: true };
      comp.options = options;
      fixture.detectChanges();

      expect(comp.selected).toBeUndefined();
   });

   it('Should set input disabled', () => {
      spyOn(comp.expand, 'emit');
      const id: string = 'test-id';
      (fixture.elementRef.nativeElement as HTMLElement).id = id;
      comp.options = simpleItems;
      comp.label = 'Test';
      comp.disabled = true;
      fixture.detectChanges();

      expect(comp.expandedMenu).toBeFalsy();
      const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
      const label: HTMLLabelElement = fixture.debugElement.query(By.css('label')).nativeElement;
      const icon: HTMLElement = fixture.debugElement.query(By.css('i')).nativeElement;

      input.click();
      fixture.detectChanges();
      expect(comp.expandedMenu).toBeFalsy();

      label.click();
      fixture.detectChanges();
      expect(comp.expandedMenu).toBeFalsy();

      icon.click();
      fixture.detectChanges();
      expect(comp.expandedMenu).toBeFalsy();

      comp.onButtonClick();
      expect(comp.expandedMenu).toBeFalsy();
      expect(comp.expand.emit).not.toHaveBeenCalled();
   });

   it('Should emit on change option', () => {
      spyOn(comp.select, 'emit');
      comp.options = simpleItems;
      comp.label = 'Test';

      fixture.detectChanges();
      expect(comp.select.emit).not.toHaveBeenCalled();

      comp.onChangeOption(simpleItems[1]);
      expect(comp.select.emit).toHaveBeenCalled();
      expect(comp.select.emit).toHaveBeenCalledWith(simpleItems[1].value);

      comp.onChangeOption(undefined);
      expect(comp.select.emit).toHaveBeenCalled();
      expect(comp.select.emit).toHaveBeenCalledWith(undefined);
   });
});

@Component({
   template: `
      <form [formGroup]="reactiveForm" novalidate autocomplete="off">
         <st-select #select
            stCheckValidations
            formControlName="option"
            placeholder="placeholder"
            name="option"
            label="Test"
            tooltip="Test Help"
            [options]="options"
            [errorMessage]="errorMessage"
            [selected]="selected"
            class="st-form-base">
         </st-select>
      </form>
      `
})
class StSelectTestReactiveComponent {
   errorMessage: string | undefined = null;
   selected: StDropDownMenuItem = null;
   options: StDropDownMenuItem[];

   reactiveForm: FormGroup;
   model: any = { option: undefined };
   @ViewChild('select') select: StSelectComponent;

   constructor(private _fb: FormBuilder) {
      this.reactiveForm = this._fb.group({
         option: [this.model.description, [Validators.required]]
      });
   }
}

describe('StSelectComponent', () => {
   describe('Reactive form instance', () => {
      let fixture: ComponentFixture<StSelectTestReactiveComponent>;
      let comp: StSelectTestReactiveComponent;
      let compSelect: StSelectComponent;

      beforeEach(async(() => {
         TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, StSelectModule],
            declarations: [StSelectTestReactiveComponent]
         }).compileComponents();  // compile template and css
      }));

      beforeEach(() => {
         fixture = TestBed.createComponent(StSelectTestReactiveComponent);
         comp = fixture.componentInstance;
         compSelect = comp.select;
      });

      afterEach(() => {
         fixture.destroy();
      });

      it('Should be possible to set disabled', () => {
         comp.options = simpleItems;
         fixture.detectChanges();
         expect(compSelect.disableValue).toBeNull();
         comp.reactiveForm.get('option').disable();
         expect(compSelect.disableValue).toEqual('');
      });

      it('Should change value from formControl', () => {
         comp.options = simpleItems;
         fixture.detectChanges();
         expect(compSelect.selected).toBeUndefined();

         comp.reactiveForm.get('option').setValue(simpleItems[1].value);
         fixture.detectChanges();
         expect(compSelect.selected).toEqual(simpleItems[1]);

         comp.reactiveForm.get('option').setValue(simpleItems[1].value);
         fixture.detectChanges();
         expect(compSelect.selected).toEqual(simpleItems[1]);
      });

      it('Should change model when select', () => {
         const responseFunction = jasmine.createSpy('response');
         comp.options = simpleItems;
         comp.reactiveForm.get('option').valueChanges.subscribe(responseFunction);
         fixture.detectChanges();

         // Open menu and select option 3
         const itemToClick: number = 2;
         expect(compSelect.expandedMenu).toBeFalsy();

         const label: HTMLLabelElement = fixture.debugElement.query(By.css('label')).nativeElement;
         label.click();
         fixture.detectChanges();
         expect(compSelect.expandedMenu).toBeTruthy();

         const items: DebugElement[] = fixture.debugElement.queryAll(By.css('st-dropdown-menu-item>li'));
         expect(items).toBeDefined();
         expect(items.length).toEqual(simpleItems.length);
         (items[itemToClick].nativeElement as HTMLElement).click();
         fixture.detectChanges();
         expect(compSelect.expandedMenu).toBeFalsy();

         expect(compSelect.selected).toEqual(simpleItems[itemToClick]);
         expect(comp.reactiveForm.get('option').value).toEqual(simpleItems[itemToClick].value);
         expect(responseFunction).toHaveBeenCalled();
         expect(responseFunction).toHaveBeenCalledWith(simpleItems[itemToClick].value);
      });

      it('Should validate required status', () => {
         comp.options = simpleItems;
         fixture.detectChanges();

         comp.reactiveForm.get('option').setValue(undefined);
         fixture.detectChanges();
         const select: HTMLElement = fixture.debugElement.query(By.css('st-select')).nativeElement;
         expect(select.classList).toContain('ng-invalid');
      });
   });
});

@Component({
   changeDetection: ChangeDetectionStrategy.OnPush,
   template: `
      <form #templateDrivenForm="ngForm" novalidate autocomplete="off">
         <st-select #select
            stCheckValidations
            class="st-form-base"
            id="test"
            placeholder="placeholder"
            name="model"
            label="Test"
            tooltip="Test Help"
            required
            [options]="options"
            [(ngModel)]="model"
            (select)="onSelect($event)"
         >
         </st-select>
      </form>
      `
})
class StSelectTestTemplateComponent {
   errorMessage: string | undefined = null;
   selected: StDropDownMenuItem = null;
   options: StDropDownMenuItem[];
   model: number;
   @ViewChild('select') select: StSelectComponent;
   @ViewChild('templateDrivenForm') templateDrivenForm: NgForm;

   onSelect(element: StDropDownMenuItem): void { this.selected = element; }
}

describe('StSelectComponent', () => {
   describe('Template form instance', () => {
      let fixture: ComponentFixture<StSelectTestTemplateComponent>;
      let comp: StSelectTestTemplateComponent;
      let compSelect: StSelectComponent;
      const optionName: string = 'model';

      beforeEach(async(() => {
         TestBed.configureTestingModule({
            imports: [FormsModule, StSelectModule],
            declarations: [StSelectTestTemplateComponent]
         }).compileComponents();  // compile template and css
      }));

      beforeEach(() => {
         fixture = TestBed.createComponent(StSelectTestTemplateComponent);
         comp = fixture.componentInstance;
         compSelect = comp.select;
      });

      afterEach(() => {
         fixture.destroy();
      });

      it('Should be possible to set disabled', async(() => {
         comp.options = simpleItems;
         fixture.detectChanges();
         fixture.whenStable().then(() => { // Form generation it's asynchronous
            comp.templateDrivenForm.form.updateValueAndValidity();
            expect(compSelect.disableValue).toBeNull();
            comp.templateDrivenForm.form.get(optionName).disable();
            expect(compSelect.disableValue).toEqual('');
         });
      }));

      it('Should change value from formControl', async(() => {
         comp.options = simpleItems;
         fixture.detectChanges();
         fixture.whenStable().then(() => { // Form generation it's asynchronous
            expect(compSelect.selected).toBeUndefined();

            comp.templateDrivenForm.form.get(optionName).setValue(simpleItems[1].value);
            fixture.detectChanges();
            expect(compSelect.selected).toEqual(simpleItems[1]);

            comp.templateDrivenForm.form.get(optionName).setValue(simpleItems[1].value);
            fixture.detectChanges();
            expect(compSelect.selected).toEqual(simpleItems[1]);
         });
      }));

      it('Should change model when select', async(() => {
         const responseFunction = jasmine.createSpy('response');
         comp.options = simpleItems;
         fixture.detectChanges();

         fixture.whenStable().then(() => { // Form generation it's asynchronous
            comp.templateDrivenForm.form.get(optionName).valueChanges.subscribe(responseFunction);
            // Open menu and select option 3
            const itemToClick: number = 2;
            expect(compSelect.expandedMenu).toBeFalsy();

            const label: HTMLLabelElement = fixture.debugElement.query(By.css('label')).nativeElement;
            label.click();
            fixture.detectChanges();
            expect(compSelect.expandedMenu).toBeTruthy();

            const items: DebugElement[] = fixture.debugElement.queryAll(By.css('st-dropdown-menu-item>li'));
            expect(items).toBeDefined();
            expect(items.length).toEqual(simpleItems.length);
            (items[itemToClick].nativeElement as HTMLElement).click();
            fixture.detectChanges();
            expect(compSelect.expandedMenu).toBeFalsy();

            expect(compSelect.selected).toEqual(simpleItems[itemToClick]);
            expect(comp.templateDrivenForm.form.get(optionName).value).toEqual(simpleItems[itemToClick].value);
            expect(responseFunction).toHaveBeenCalled();
            expect(responseFunction).toHaveBeenCalledWith(simpleItems[itemToClick].value);
         });
      }));

      it('Should validate required status', async(() => {
         comp.options = simpleItems;
         fixture.detectChanges();
         fixture.whenStable().then(() => { // Form generation it's asynchronous
            comp.templateDrivenForm.form.get(optionName).setValue(undefined);
            fixture.detectChanges();
            const select: HTMLElement = fixture.debugElement.query(By.css('st-select')).nativeElement;
            expect(select.classList).toContain('ng-invalid');
         });
      }));
   });
});
