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
  travelLogos: string[] = [];
  
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
    const baseLogos: string[] = [
      '32 Logos For Web/logos for web-16.png',
      '32 Logos For Web/HKBK.png',
      '32 Logos For Web/shree bhavani .png',
      '32 Logos For Web/logos for web-23.png',
      '32 Logos For Web/Camellia institute of technology.png',
      '32 Logos For Web/logos for web-25.png',
      '32 Logos For Web/classic hospitality.png',
      '32 Logos For Web/ST claret college.png',
      '32 Logos For Web/SRM University.png',
      '32 Logos For Web/logos for web-09.png',
      '32 Logos For Web/logos for web-03.png',
      '32 Logos For Web/st pauls .png',
      '32 Logos For Web/logos for web-18.png',
      '32 Logos For Web/Brindavan.png',
      '32 Logos For Web/logos for web-11.png',
      '32 Logos For Web/Chitkara .png',
      '32 Logos For Web/logos for web-30.png',
      '32 Logos For Web/logos for web-29.png',
      '32 Logos For Web/rustomjee .png',
      '32 Logos For Web/Spurthy institution .png',
      '32 Logos For Web/logos for web-21.png',
      '32 Logos For Web/logos for web-02.png',
      '32 Logos For Web/harsha.png',
      '32 Logos For Web/Josco .png',
      '32 Logos For Web/logos for web-31.png',
      '32 Logos For Web/logos for web-20.png',
      '32 Logos For Web/logos for web-28.png',
      '32 Logos For Web/adarsha college .png',
      '32 Logos For Web/Alpine group of institution.png',
      '32 Logos For Web/logos for web-13.png',
      '32 Logos For Web/ST Peter_s .png',
      '32 Logos For Web/logos for web-17.png',
      '32 Logos For Web/logos for web-05.png',
      '32 Logos For Web/logos for web-15.png',
      '32 Logos For Web/logos for web-26.png',
      '32 Logos For Web/logos for web-07.png',
      '32 Logos For Web/iqoniqe.png',
      '32 Logos For Web/T John college.png',
      '32 Logos For Web/logos for web-27.png',
      '32 Logos For Web/OP Jindal.png',
      '32 Logos For Web/MVN University.png',
      '32 Logos For Web/logos for web-19.png',
      '32 Logos For Web/logos for web-01.png',
      '32 Logos For Web/logos for web-14.png',
      '32 Logos For Web/logos for web-04.png',
      '32 Logos For Web/logos for web-06.png',
      '32 Logos For Web/srinivas .png',
      '32 Logos For Web/Aditya .png',
      '32 Logos For Web/GRD.png',
      '32 Logos For Web/SGT University.png',
      '32 Logos For Web/logos for web-32.png',
      '32 Logos For Web/Dhana lakshmi srinivasan.png',
      '32 Logos For Web/vijay nagar .png',
      '32 Logos For Web/IIT Madras.png',
      '32 Logos For Web/Guru nanak .png',
    ];

    // Shuffle the array
    for (let i = baseLogos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [baseLogos[i], baseLogos[j]] = [baseLogos[j], baseLogos[i]];
    }

    // Unique logos for static grid (mobile + desktop)
    this.uniquePartnerLogos = [...baseLogos];
    // Duplicate for seamless scroll (kept for backward compat)
    this.partnerLogos = [...baseLogos, ...baseLogos];

    // Initialize consultancy logos
    this.consultancyLogos = [
      'cosultancy parteners/wayzon.png',
      'cosultancy parteners/Blue bell .png',
      'cosultancy parteners/Embark .png',
      'cosultancy parteners/Heralds1.png',
      'cosultancy parteners/Mathews1.png',
      'cosultancy parteners/Super1.png',
      'cosultancy parteners/Ultimate1 .png',
      'cosultancy parteners/logos for web-22.png',
      'cosultancy parteners/Aspiros 1.png',
    ];

    // Initialize travel logos
    this.travelLogos = [
      'travel partners/Moventiti.png',
      'travel partners/logos for web-10.png',
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
