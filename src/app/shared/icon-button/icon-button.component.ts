import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[sn-icon-button]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['icon-button.component.scss']
})
export class IconButtonComponent {
  constructor() { }
}
