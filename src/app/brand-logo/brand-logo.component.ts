import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'sn-brand-logo',
  templateUrl: './brand-logo.component.html',
  styleUrls: ['./brand-logo.component.css']
})
export class BrandLogoComponent {
  @Input()
  set prefix(val: string) {
    this._prefix = val;
  }
  @Input() theme: 'original' | 'green' = 'original';
  public _prefix = 'sn';
  get prefix() {
    return this._prefix;
  }

  makeId(id: string) {
    return `${this.prefix}-${id}`;
  }

  constructor(public sanitization: DomSanitizer) {}
}
