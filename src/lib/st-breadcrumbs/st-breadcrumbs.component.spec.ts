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
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { StBreadCrumbsComponent } from './st-breadcrumbs.component';

describe('[BreadCrumbsComponent]', () => {
   let component: StBreadCrumbsComponent;
   let fixture: ComponentFixture<StBreadCrumbsComponent>;

   let windowRefServiceMock: any;
   let menuMock1 = ['section1', 'section2', 'section3', 'section4', 'section5'];
   let menuMock2 = [
      'section6',
      'section7',
      'section8',
      'section9',
      'section10'
   ];

   beforeEach(
      async(() => {
         TestBed.configureTestingModule({
            declarations: [StBreadCrumbsComponent],
            schemas: [NO_ERRORS_SCHEMA]
         }).compileComponents(); // compile template and css
      })
   );

   beforeEach(() => {
      windowRefServiceMock = {};
      windowRefServiceMock.nativeWindow = window;
      fixture = TestBed.createComponent(StBreadCrumbsComponent);
      component = fixture.componentInstance;
   });

   describe('if initialized with 6 elements or less', () => {
      beforeEach(() => {
         component.options = menuMock1;
      });

      it('All elements will be shown', () => {
         expect(component.generateCrumbs()).toEqual(menuMock1);
      });

      it('And user clicks on an element, component emits the element position', () => {
         spyOn(component.select, 'emit');
         component.onSelect(2);
         expect(component.select.emit).toHaveBeenCalledWith(2);
      });

      it('If user clicks on the active element, nothing happens', () => {
         component.onSelect(4);
         spyOn(component.select, 'emit');
         expect(component.select.emit).not.toHaveBeenCalled();
      });
   });

   describe('if initialized when more 6 elements or less', () => {
      beforeEach(() => {
         component.options = menuMock1.concat(menuMock2);
      });

      it('the first element will be displayed followed by 3 dots and concatenated with the last 5 items', () => {
         expect(component.generateCrumbs()[0]).toEqual(menuMock1[0]);
         expect(component.generateCrumbs()[1]).toEqual('...');
         expect(component.generateCrumbs().slice(-4)).toEqual(
            menuMock2.slice(-4)
         );
      });

      it('if user clicks on an element displayed after dots, component emits the real position of element', () => {
         spyOn(component.select, 'emit');
         component.onSelect(3);
         expect(component.select.emit).toHaveBeenCalledWith(3);
      });
   });
});
