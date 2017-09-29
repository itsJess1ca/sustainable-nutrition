import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'sn-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  data: {supportEmailAddress: string, contactNumber: string, businessAddress: string};

  model = {
    name: '',
    from: '',
    message: '',
    isDebug: ENV !== 'production'
  };

  sending = false;
  sent = false;

  submitted = false;

  constructor(private route: ActivatedRoute, private http: Http, private zone: NgZone) { }

  ngOnInit() {
    this.route.data.subscribe(({contact}: {contact: {supportEmailAddress: string, contactNumber: string, businessAddress: string}}) => {
      this.data = contact;
    });
  }

  sendContact() {
    this.sending = true;
    this.submitted = true;
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    this.http.post(`${API_BASE_URL}/mailer/send`, this.model, options)
      .subscribe(() => {
        this.sending = false;
        this.sent = true;
        this.zone.runOutsideAngular(() => setTimeout(() => {
          this.sent = false;
        }, 30000));
        console.log('Contact message sent');
      });

  }

  get diagnostic() { return JSON.stringify(this.model); };

}
