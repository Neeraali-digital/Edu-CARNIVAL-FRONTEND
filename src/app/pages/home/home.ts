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
      if (i === 8) continue;
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

    if (typeof document !== 'undefined') {
      setTimeout(() => {
        this.triggerConfetti();
      }, 500);
    }
  }

  triggerConfetti() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '9999';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: any[] = [];
    const colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6', '#14B8A6'];
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const createParticle = (x: number, y: number, angle: number) => {
      // Much slower velocities: especially on mobile to drift gently
      const velocity = isMobile ? (1.5 + Math.random() * 3) : (2.5 + Math.random() * 5);
      const rad = (angle * Math.PI) / 180;
      const spread = isMobile ? 0.8 : 1.5;
      return {
        x,
        y,
        vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * spread,
        vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * spread,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: isMobile ? (4 + Math.random() * 5) : (6 + Math.random() * 8),
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * (isMobile ? 2 : 3.5),
        shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)]
      };
    };

    // Blast from top-center pointing downwards and outwards (wide angle)
    for (let i = 0; i < 110; i++) {
      particles.push(createParticle(canvas.width / 2, -10, 35 + Math.random() * 110));
    }
    // Plus side blasts from top-left and top-right corners shooting inwards/downwards
    for (let i = 0; i < 45; i++) {
      particles.push(createParticle(-10, -10, 15 + Math.random() * 65)); // down-right
      particles.push(createParticle(canvas.width + 10, -10, 100 + Math.random() * 65)); // down-left
    }

    // Extra low gravity and high friction to make it look like light drifting paper/confetti
    const gravity = isMobile ? 0.035 : 0.065;
    const friction = isMobile ? 0.99 : 0.985;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;

      particles.forEach(p => {
        p.vy += gravity;
        p.vx *= friction;
        p.vy *= friction;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.y < canvas.height + 20 && p.x > -20 && p.x < canvas.width + 20) {
          active = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;

          ctx.beginPath();
          if (p.shape === 'circle') {
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          } else if (p.shape === 'square') {
            ctx.rect(-p.size / 2, -p.size / 2, p.size, p.size);
          } else {
            ctx.moveTo(0, -p.size / 2);
            ctx.lineTo(p.size / 2, p.size / 2);
            ctx.lineTo(-p.size / 2, p.size / 2);
            ctx.closePath();
          }
          ctx.fill();
          ctx.restore();
        }
      });

      if (active) {
        requestAnimationFrame(animate);
      } else {
        window.removeEventListener('resize', resizeCanvas);
        canvas.remove();
      }
    };

    requestAnimationFrame(animate);
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
