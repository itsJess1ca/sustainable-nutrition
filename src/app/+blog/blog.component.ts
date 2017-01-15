import { Component, OnInit } from '@angular/core';
import { MediumService } from '../shared/medium.service';

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

  constructor(private medium: MediumService) { }


  ngOnInit() {
    this.medium.getPosts({
      user: '@medium',
      limit: '5'
    }).subscribe((data) => {
      console.log(data);
    });
  }

}
