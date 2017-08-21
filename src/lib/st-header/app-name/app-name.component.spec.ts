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
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

// Component
import { AppNameComponent } from './app-name.component';

let comp: AppNameComponent;
let fixture: ComponentFixture<AppNameComponent>;
let de: DebugElement;


describe('StHeader component', () => {
   beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppNameComponent]
    })
    .compileComponents();  // compile template and css
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNameComponent);
    comp = fixture.componentInstance;

    comp.appLogoPath = undefined;
    comp.appName = 'Test App';
    comp.companyName = 'Stratio';

    fixture.autoDetectChanges(true);
  });

    describe('AppName component', () => {
        it('should be init correctly without image', () => {
            let appLabel: HTMLDivElement = fixture.debugElement.query(By.css('.app-label')).nativeElement;
            let appName: HTMLSpanElement = fixture.debugElement.query(By.css('.sth-app-name')).nativeElement;
            let companyName: HTMLSpanElement = fixture.debugElement.query(By.css('.company-name')).nativeElement;


            expect(appLabel).toBeDefined();
            expect(appLabel).not.toBeNull();
            expect(comp.showAppName).toBeTruthy();
            expect(appName.textContent).toBe(comp.appName);
            expect(companyName.textContent).toBe(comp.companyName);
        });
    });
});
