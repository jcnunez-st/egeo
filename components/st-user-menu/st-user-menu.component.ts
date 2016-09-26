import { Component, Input, Injectable, ElementRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'st-user-menu',
  template: require('./st-user-menu.component.html'),
  styles: [require('./st-user-menu.component.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Injectable()
export class StUserMenuComponent {
  @Input() userName: string;
  @Input() qaTag: string;

  showUserMenu: boolean = false;

  constructor(private _elementRef: ElementRef) {
    this.userName = '';
  }

  changeMenuState($event: Event): void {
    $event.stopPropagation();
    this.showUserMenu ? this.closeMenu() : this.openMenu();
  }

  openMenu(): void {
    let self = this;
    self.showUserMenu = true;
    document.addEventListener('click', self.offClickHandler.bind(self));
  }

  closeMenu(): void {
    let self = this;
    self.showUserMenu = false;
    document.removeEventListener('click', self.offClickHandler);
  }

  offClickHandler(): void {
    if (this.showUserMenu) {
      this.closeMenu();
    }
  }
}
