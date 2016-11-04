import { Component, Input, OnInit, OnChanges, Renderer, ElementRef } from '@angular/core';

@Component({
  selector: '[bordered-header]',
  styleUrls: ['bordered-header.component.scss'],
  template: `<ng-content></ng-content>`
})
export class BorderedHeaderComponent {
  constructor(
  ) {}
}
