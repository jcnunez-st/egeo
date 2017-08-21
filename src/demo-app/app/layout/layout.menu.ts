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
export interface MenuOption {
   route: string;
   name: string;
}

export const OPTIONS: MenuOption[] = [
   { route: 'alerts-demo', name: 'Alerts' },
   { route: 'dropdown-demo', name: 'Dropdown' },
   { route: 'dropdown-menu-demo', name: 'Dropdown Menu' },
   { route: 'button-demo', name: 'Buttons' },
   { route: 'help-demo', name: 'help' },
   { route: 'info-box-demo', name: 'info-box' },
   { route: 'item-list-demo', name: 'item-list' },
   { route: 'form-demo', name: 'Form' },
   { route: 'main', name: 'main' },
   { route: 'modal-demo', name: 'Modal' },
   { route: 'pagination-demo', name: 'Pagination' },
   { route: 'page-title-demo', name: 'Page Title' },
   { route: 'search-demo', name: 'Search' },
   { route: 'select-demo', name: 'Select' },
   { route: 'switch-demo', name: 'Switch' },
   { route: 'tip-demo', name: 'tip' },
   { route: 'tooltip-demo', name: 'Tooltip' },
   { route: 'tree-demo', name: 'Tree' },
   { route: 'two-list-selection-demo', name: 'Two List Selection' },
   { route: 'breadcrumbs', name: 'Breadcrumbs' },
   { route: 'input', name: 'Input' }
];
