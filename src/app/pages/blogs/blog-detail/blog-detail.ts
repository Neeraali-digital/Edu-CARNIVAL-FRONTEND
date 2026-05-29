import { Component, OnInit, AfterViewChecked, ElementRef, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { BLOGS, Blog } from '../../../data/blogs';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-detail.html',
  styleUrls: ['./blog-detail.css'],
  encapsulation: ViewEncapsulation.None
})
export class BlogDetailComponent implements OnInit, AfterViewChecked, OnDestroy {
  blog: Blog | undefined;
  private faqInitialized = false;
  private faqClickHandler: ((e: Event) => void) | null = null;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.blog = BLOGS.find(b => b.id === id);
      this.faqInitialized = false; // Reset on route change

      if (this.blog) {
        this.updateMetaData(this.blog);
      }
    });
  }

  ngAfterViewChecked(): void {
    if (this.faqInitialized) return;

    const faqAccordion = this.el.nativeElement.querySelector('.faq-accordion');
    if (faqAccordion) {
      this.faqInitialized = true;
      this.faqClickHandler = (e: Event) => {
        const target = e.target as HTMLElement;
        const question = target.closest('.faq-question');
        if (!question) return;

        const faqItem = question.closest('.faq-item');
        if (faqItem) {
          faqItem.classList.toggle('active');
        }
      };
      faqAccordion.addEventListener('click', this.faqClickHandler);
    }
  }

  ngOnDestroy(): void {
    if (this.faqClickHandler) {
      const faqAccordion = this.el.nativeElement.querySelector('.faq-accordion');
      if (faqAccordion) {
        faqAccordion.removeEventListener('click', this.faqClickHandler);
      }
    }
  }

  updateMetaData(blog: Blog): void {
    this.titleService.setTitle(blog.metaTitle || blog.title);
    this.metaService.updateTag({ name: 'description', content: blog.metaDescription || blog.description });
    
    // Open Graph tags
    this.metaService.updateTag({ property: 'og:title', content: blog.metaTitle || blog.title });
    this.metaService.updateTag({ property: 'og:description', content: blog.metaDescription || blog.description });
    this.metaService.updateTag({ property: 'og:image', content: blog.image });
  }

  sharePost(platform: string): void {
    const url = window.location.href;
    const title = this.blog?.title || 'Edu Carnival Blog';
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`;
        break;
      case 'instagram':
        // Instagram doesn't have a direct share URL for web. Redirecting to profile as requested.
        shareUrl = 'https://www.instagram.com/educarnival_expo?igsh=NHRodTV4dTE3cGdy';
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  }
}
