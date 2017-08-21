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
import { DebugElement, Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StPopComponent } from './st-pop.component';

@Component({
   selector: 'test-component',
   template: `
      <st-pop [hidden]="hidden" [placement]="placement">
         <div pop-button id="button"><button style="height:30px; width:20px">Button</button></div>
         <div pop-content id="content">Content</div>
      </st-pop>
   `
})
class TestComponent {
   @Input() hidden: boolean = true;
   @Input() placement: string = 'top';
}

describe('StPopComponent', () => {

   let component: TestComponent;
   let fixture: ComponentFixture<TestComponent>;
   let de: DebugElement;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [StPopComponent, TestComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
   });


   it('should show the content of the pop', () => {
      component.hidden = false;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('[hidden]')).toBeNull();
   });

   it('should hide the content of the pop', () => {
      component.hidden = true;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('[hidden]')).toBeDefined();
   });

   it('should get correct coords', () => {
      component.hidden = false;

      component.placement = 'top';
      fixture.detectChanges();
      let content: HTMLElement = fixture.debugElement.nativeElement.querySelector('#content');
      expect(content.style.transform).toEqual('translate3d(10px, -30px, 0px)');

      component.placement = 'top-start';
      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.querySelector('#content');
      expect(content.style.transform).toEqual('translate3d(0px, -30px, 0px)');

      component.placement = 'top-end';
      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.querySelector('#content');
      expect(content.style.transform).toEqual('translate3d(20px, -30px, 0px)');

      component.placement = 'bottom';
      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.querySelector('#content');
      expect(content.style.transform).toEqual('translate3d(10px, 0px, 0px)');

      component.placement = 'bottom-start';
      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.querySelector('#content');
      expect(content.style.transform).toEqual('translate3d(0px, 0px, 0px)');

      component.placement = 'bottom-end';
      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.querySelector('#content');
      expect(content.style.transform).toEqual('translate3d(20px, 0px, 0px)');

      component.placement = 'unknown';
      fixture.detectChanges();
      content = fixture.debugElement.nativeElement.querySelector('#content');
      expect(content.style.transform).toEqual('translate3d(0px, 0px, 0px)');
   });


   it('should get init without button', () => {
      component.hidden = false;
      let button: HTMLElement = fixture.debugElement.nativeElement.querySelector('#button');
      button.innerHTML = '';

      fixture.detectChanges();
      let content: HTMLElement = fixture.debugElement.nativeElement.querySelector('#content');
      expect(content.style.transform).toBeUndefined();
   });

});
