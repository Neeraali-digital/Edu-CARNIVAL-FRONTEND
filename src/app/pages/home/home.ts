import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { ApiService } from '../../services/api.service';
import { CITIES } from '../../data/cities';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  cities = CITIES.filter(city => !city.is_completed);
  partnerLogos: string[] = [];
  uniquePartnerLogos: string[] = [];
  consultancyLogos: string[] = [];
  
  aboutText = `Edu Carnival is a dedicated team specializing in organizing Education Expo events and education fair across India since 2016, with a strong focus on the upcoming Education Expo India 2026. With years of experience, we have built a strong reputation for conducting impactful and student-focused expos that connect aspiring students with top institutions.
We have successfully organized multiple Education Expo events across the country, with a strong presence in Northern and North-Eastern regions. Our expertise in hosting large-scale events makes us a trusted name for every education fair in North East India, attracting students, parents, and leading universities.
Our education expos are known for the direct participation of reputed colleges and universities from India and abroad. Each Education Expo we organize ensures valuable interactions, expert guidance, and excellent opportunities for students to explore their academic future.
`;
  showFullText = false;
  charLimit = 400;

  @ViewChild('partnerScroll') partnerScroll!: ElementRef;
  scrollAnimationId: any;
  isScrollingPaused = false;

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private meta: Meta
  ) {
    // Initialize partner logos array
    const logos: string[] = [];
    for (let i = 1; i <= 32; i++) {
      if (i === 8 || i === 12 || i === 24) continue;
      const logoNum = i < 10 ? `0${i}` : `${i}`;
      logos.push(`32 Logos For Web/logos for web-${logoNum}.png`);
    }
    // Add new partner logos
    logos.push(
      '32 Logos For Web/Aditya .png',
      '32 Logos For Web/Brindavan.png',
      '32 Logos For Web/Chitkara .png',
      '32 Logos For Web/Guru nanak .png',
      '32 Logos For Web/IIT Madras.png',
      '32 Logos For Web/harsha.png',
      '32 Logos For Web/shree bhavani .png',
    );
    // Unique logos for static grid (mobile + desktop)
    this.uniquePartnerLogos = [...logos];
    // Duplicate for seamless scroll (kept for backward compat)
    this.partnerLogos = [...logos, ...logos];

    // Initialize consultancy logos
    this.consultancyLogos = [
      'cosultancy parteners/wayzon.jpeg',
      'cosultancy parteners/aspiros.jpeg',
      'cosultancy parteners/super.jpeg',
      'cosultancy parteners/heralds.png',
      'cosultancy parteners/embark.png',
      'cosultancy parteners/mathews.png',
      'cosultancy parteners/ultimate.png',
    ];
  }

  ngOnInit() {
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Education Expo in India 2026 – College Admission Fair by Edu Carnival. Discover universities, courses, scholarships, and study abroad guidance.' 
    });
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    // Only scroll when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isScrollingPaused = false;
          } else {
            this.isScrollingPaused = true;
          }
        });
      },
      { threshold: 0.1 },
    );

    if (this.partnerScroll) {
      observer.observe(this.partnerScroll.nativeElement);
    }

    this.startAutoScroll();

  }



  ngOnDestroy() {
    this.stopAutoScroll();
  }

  startAutoScroll() {
    this.ngZone.runOutsideAngular(() => {
      let lastTime = performance.now();
      const step = (time: number) => {
        const el = this.partnerScroll?.nativeElement;
        if (el && !this.isScrollingPaused && window.innerWidth < 1024) {
          const dt = time - lastTime;
          // Smooth scroll increment
          el.scrollLeft += dt * 0.03; // Slightly slower for better readability
          
          // Seamless reset: when we reach the middle (first set of logos finished), 
          // jump back to the start without animation
          const halfWidth = el.scrollWidth / 2;
          if (el.scrollLeft >= halfWidth) {
            el.scrollLeft = 0;
          }
        }
        lastTime = time;
        this.scrollAnimationId = requestAnimationFrame(step);
      };
      this.scrollAnimationId = requestAnimationFrame(step);
    });
  }

  stopAutoScroll() {
    if (this.scrollAnimationId) {
      cancelAnimationFrame(this.scrollAnimationId);
    }
  }

  pauseScroll() {
    this.isScrollingPaused = true;
  }

  resumeScroll() {
    this.isScrollingPaused = false;
  }

  toggleAboutText() {
    this.showFullText = !this.showFullText;
  }
}
