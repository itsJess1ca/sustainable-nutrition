import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sn-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.css']
})
export class BlogComponent implements OnInit {

  blogs: Post[];

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.data.subscribe(({posts}: {posts: Post[]}) => {
      console.log(posts[0]);
      this.blogs = posts;
    });
  }

  linkToPost(url: string) {
    if (window) window.open(url);
  }

}

export interface Post {
  excerpt: string;
  subtitle: string;
  title: string;
  updatedAt: string;
  url: string;
}
