import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { BLOGS, Blog } from '../../../data/blogs';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-detail.html',
  styleUrls: ['./blog-detail.css']
})
export class BlogDetailComponent implements OnInit {
  blog: Blog | undefined;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.blog = BLOGS.find(b => b.id === id);
      
      if (this.blog) {
        this.updateMetaData(this.blog);
      }
    });
  }

  updateMetaData(blog: Blog): void {
    this.titleService.setTitle(blog.metaTitle || blog.title);
    this.metaService.updateTag({ name: 'description', content: blog.metaDescription || blog.description });
    
    // Open Graph tags
    this.metaService.updateTag({ property: 'og:title', content: blog.metaTitle || blog.title });
    this.metaService.updateTag({ property: 'og:description', content: blog.metaDescription || blog.description });
    this.metaService.updateTag({ property: 'og:image', content: blog.image });
  }
}
