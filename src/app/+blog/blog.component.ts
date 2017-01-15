import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sn-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.css']
})
export class BlogComponent implements OnInit {

  blogs: any[] =
    [
      {
        'one': 1
      },
      {
        'two': 1
      }
    ];

  constructor() { }


  ngOnInit() {
  }

}
