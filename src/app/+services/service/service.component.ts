import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Service } from '../../shared/contentful.service';

@Component({
  selector: 'sn-service',
  templateUrl: 'service.component.html',
  styleUrls: ['./service.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceComponent implements OnInit {
  @Input() service: Service;

  @Input() index: number;

  ngOnInit() {
  }

}
