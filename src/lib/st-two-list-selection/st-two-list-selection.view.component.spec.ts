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
import { Http } from '@angular/http';
import { By } from '@angular/platform-browser';
import { VirtualScrollModule } from 'angular2-virtual-scroll';
import {
   times as _times
} from 'lodash';

// Components
import { ListItemComponent } from './list-item/list-item.component';
import { ListSelectionComponent } from './list-selection/list-selection.component';
import { ListScrollComponent } from './list-scroll/list-scroll.component';
import { StTwoListSelectionViewComponent } from './st-two-list-selection.view.component';

// Order modules
import { PipesModule } from '../pipes/pipes.module';
import { StSearchModule } from '../st-search/st-search.module';
import { StButtonModule } from '../st-button/st-button.module';
import { StDropdownModule } from '../st-dropdown/st-dropdown.module';
import { StCheckboxModule } from '../st-checkbox/st-checkbox.module';

// Mdel
import { StTwoListSelectionConfig, StTwoListSelectionElement } from './st-two-list-selection.model';

let comp: StTwoListSelectionViewComponent;
let fixture: ComponentFixture<StTwoListSelectionViewComponent>;
let de: DebugElement;

let config: StTwoListSelectionConfig = {
   allElementsListTitle: 'All',
   allElementsSearchPlaceholder: 'Search all',
   selectedElementsListTitle: 'Selected',
   selectedElementsSearchPlaceholder: 'Search selected'
};
let qaTag: string = 'st-two-list-test';

function generateData(numData: number): StTwoListSelectionElement[] {
   return _times(10, (i) => {
      return {
         id: i,
         name: i > 5 ? `${i}Element` : `Element${i}`
      };
   });
}

describe('StTwoListSelectionComponent', () => {
   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [StSearchModule, PipesModule, VirtualScrollModule, StButtonModule, StDropdownModule, StCheckboxModule],
         declarations: [StTwoListSelectionViewComponent, ListSelectionComponent, ListItemComponent, ListScrollComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StTwoListSelectionViewComponent);
      comp = fixture.componentInstance;
      comp.qaTag = qaTag;
      comp.allElements = generateData(10);
      comp.selectedElements = [];
   });

   describe('StTwoListSelectionViewComponent', () => {
      it('Should init correctly', () => {
         comp.config = config;
         fixture.detectChanges();

         expect(comp.allTitle).toEqual(config.allElementsListTitle);
         expect(comp.allPlaceholder).toEqual(config.allElementsSearchPlaceholder);
         expect(comp.selectedTitle).toEqual(config.selectedElementsListTitle);
         expect(comp.selectedPlaceholder).toEqual(config.selectedElementsSearchPlaceholder);
         expect(comp.allQaTag).toContain(qaTag);
         expect(comp.selectedQaTag).toContain(qaTag);
      });

      it('Should init default', () => {
         fixture.detectChanges();

         expect(comp.allTitle).toEqual('');
         expect(comp.allPlaceholder).toEqual('');
         expect(comp.selectedTitle).toEqual('');
         expect(comp.selectedPlaceholder).toEqual('');
         expect(comp.allQaTag).toContain(qaTag);
         expect(comp.selectedQaTag).toContain(qaTag);
      });
   });
});
