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
import { Component, AfterViewInit, ViewContainerRef, ViewChild } from '@angular/core';
import {
   StModalService,
   StModalConfig,
   StModalButton,
   StModalWidth,
   StModalMainTextSize,
   StModalType,
   StModalResponse
} from '@stratio/egeo';

import { StModalDemoTestComponent } from './st-modal-test-demo.component';

@Component({
   selector: 'modal-example',
   templateUrl: './st-modal-demo.component.html'
})

export class StModalDemoComponent implements AfterViewInit {
   @ViewChild('loadModal', { read: ViewContainerRef }) target: ViewContainerRef;

   private buttons: StModalButton[] = [
      { icon: 'icon-trash', iconLeft: true, label: 'Delete', primary: true, response: StModalResponse.YES },
      { icon: 'icon-circle-cross', iconLeft: true, label: 'Cancel', response: StModalResponse.NO }
   ];

   constructor(private _modalService: StModalService) { }

   ngAfterViewInit(): void {
      this._modalService.container = this.target;
   }

   showModal(): void {

      const message: string = 'Are you sure of delete this?';

      this._modalService.show({
         qaTag: 'tag-message',
         modalTitle: 'Delete item',
         buttons: this.buttons,
         message: message,
         mainText: StModalMainTextSize.BIG,
         modalType: StModalType.WARNING
      }).subscribe((response) => console.log(this.evaluateResponse(response)));
   }

   showModalWithHtml(): void {
      const html: string = `
      <h1 class="st-modal-example-test-class-h1">Main title<h1>
      <br>
      <p>paragraph of some text between p html tags, and now a list:</p>
      <br>
      <div>
         <ul class="st-modal-example-test-class-list">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
            <li>Item 5</li>
         </ul>
      </div>
      `;
      this._modalService.show({
         qaTag: 'tag-html',
         modalTitle: 'With HTML',
         buttons: this.buttons,
         html: html,
         mainText: StModalMainTextSize.MEDIUM,
         modalType: StModalType.INFO,
         contextualTitle: 'VALIDATION STATUS'
      }).subscribe((response) => console.log(this.evaluateResponse(response)));
   }

   showModalWithComponent(): void {
      this._modalService.show(
         {
            qaTag: 'tag-complex',
            modalTitle: 'With component',
            buttons: this.buttons,
            modalType: StModalType.NEUTRAL,
            contextualTitle: 'CONTEXTUAL TITLE'
         },
         StModalDemoTestComponent
      ).subscribe((response) => console.log(this.evaluateResponse(response)));
   }

   showModalBySize(size: string): void {
      let width: StModalWidth = StModalWidth.COMPACT;
      if (size === 'compact') {
         width = StModalWidth.COMPACT;
      } else if (size === 'regular') {
         width = StModalWidth.REGULAR;
      } else if (size === 'large') {
         width = StModalWidth.LARGE;
      }

      const message: string = 'Are you sure of delete this?';

      this._modalService.show({
         qaTag: 'tag-' + size,
         modalTitle: size,
         buttons: this.buttons,
         message: message,
         mainText: StModalMainTextSize.BIG,
         modalType: StModalType.INFO,
         modalWidth: width
      }).subscribe((response) => console.log(this.evaluateResponse(response)));
   }

   private evaluateResponse(response: StModalResponse): string {
      switch (response) {
         case StModalResponse.YES: return 'YES';
         case StModalResponse.NO: return 'NO';
         case StModalResponse.CLOSE: return 'CLOSE';
         default: return 'Error response not found';
      }
   }
}
