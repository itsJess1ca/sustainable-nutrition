import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sn-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  data: {supportEmailAddress: string, telephoneNumber: string, businessAddress: string};
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(({contact}: {contact: {supportEmailAddress: string, contactNumber: string, businessAddress: string}}) => {
      this.data = contact;
    });
  }

}
