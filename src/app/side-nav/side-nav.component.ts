import { Component, OnInit, Input, ElementRef, Renderer, ViewChild } from '@angular/core';

@Component({
  selector: 'sn-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input() Routes: any;
  @ViewChild('sidenav') sidenav: ElementRef;
  visible: boolean = false;

  constructor(
    private renderer: Renderer
  ) { }

  ngOnInit() {
  }

  open() {
    this.visible = true;
    this.renderer.setElementClass(this.sidenav.nativeElement, 'sidenav--visible', true);
  }
  close() {
    this.visible = false;
    this.renderer.setElementClass(this.sidenav.nativeElement, 'sidenav--visible', false);
  }
}
