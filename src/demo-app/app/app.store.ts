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
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/distinctUntilChanged';

export interface State {
   /// defeine your state here
}

const defaultState: State = {
   /// define your initial state here
};

const store = new BehaviorSubject<State>(defaultState);

@Injectable()
export class AppStore {

   _store: any = store;

   change: any = this._store
      .asObservable()
      .distinctUntilChanged();

   setState(state: State): void {
      this._store.next(state);
   }

   getState(): State {
      return this._store.value;
   }

   purge(): void {
      this._store.next(defaultState);
   }
}
