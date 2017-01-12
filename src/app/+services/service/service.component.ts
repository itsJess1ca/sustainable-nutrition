import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sn-service',
  templateUrl: 'service.component.html',
  styleUrls: ['./service.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceComponent implements OnInit {
  @Input() service: '';

  @Input() index: number;

  ngOnInit() {
  }

}
