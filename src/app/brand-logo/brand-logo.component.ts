import { Component, Input } from '@angular/core';

@Component({
  selector: 'sn-brand-logo',
  templateUrl: './brand-logo.component.html',
  styleUrls: ['./brand-logo.component.css']
})
export class BrandLogoComponent {
  @Input() theme: 'original' | 'green' = 'original';
}
