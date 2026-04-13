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
  cities = CITIES;
  partnerLogos: string[] = [];
  consultancyLogos: string[] = [];

  @ViewChild('partnerScroll') partnerScroll!: ElementRef;
  scrollAnimationId: any;
  isScrollingPaused = false;

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
  ) {
    // Initialize partner logos array
    const logos: string[] = [];
    for (let i = 1; i <= 32; i++) {
      if (i === 8) continue;
      const logoNum = i < 10 ? `0${i}` : `${i}`;
      logos.push(`32 Logos For Web/logos for web-${logoNum}.png`);
    }
    // Duplicate for seamless scroll
    this.partnerLogos = [...logos, ...logos];

    // Initialize consultancy logos
    this.consultancyLogos = [
      'cosultancy parteners/Wayzon logo Education Consultancy-02.jpg (2).jpeg',
      'cosultancy parteners/WhatsApp Image 2026-04-13 at 12.45.29.jpeg',
      'cosultancy parteners/WhatsApp Image 2026-04-06 at 16.56.46.jpeg',
      'cosultancy parteners/embark logo png.png',
    ];
  }

  ngOnInit() {
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
}
