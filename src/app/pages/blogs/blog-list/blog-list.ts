import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BLOGS, Blog } from '../../../data/blogs';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-list.html',
  styleUrls: ['./blog-list.css']
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = BLOGS;

  constructor() {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
