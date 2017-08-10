import { Component, OnInit } from '@angular/core';
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

  submitted = false;

  constructor(private route: ActivatedRoute, private http: Http) { }

  ngOnInit() {
    this.route.data.subscribe(({contact}: {contact: {supportEmailAddress: string, contactNumber: string, businessAddress: string}}) => {
      this.data = contact;
    });
  }

  sendContact() {
    this.submitted = true;
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    this.http.post(`${API_BASE_URL}/mailer/send`, this.model, options)
      .subscribe(() => {
        console.log('Contact message sent');
      });

  }

  get diagnostic() { return JSON.stringify(this.model); };

}
