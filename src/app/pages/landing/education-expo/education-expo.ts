import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import confetti from 'canvas-confetti';

import { CITIES, City } from '../../../data/cities';
import { ApiService } from '../../../services/api.service';
import { ToastService } from '../../../services/toast.service';

interface CountdownState {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface AgendaSession {
  time: string;
  title: string;
  speaker: string;
  highlight: string;
}

interface AgendaTab {
  key: string;
  label: string;
  kicker: string;
  description: string;
  sessions: AgendaSession[];
}

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  score: string;
  metric: string;
  avatar?: string;
}

@Component({
  selector: 'app-education-expo-landing',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './education-expo.html',
  styleUrl: './education-expo.css',
})
export class EducationExpoLandingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('revealRef') revealRefs!: QueryList<ElementRef<HTMLElement>>;

  readonly cities: City[] = [...CITIES].sort((left, right) =>
    (left.start_date ?? '9999-12-31').localeCompare(right.start_date ?? '9999-12-31'),
  );

  get upcomingCities(): City[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.cities.filter(city => {
      if (!city.start_date) return false;
      const eventDate = new Date(`${city.start_date}T00:00:00+05:30`);
      return eventDate >= today;
    }).slice(0, 2);
  }

  readonly nextEvent = this.getNextEvent();
  
  readonly testimonials: Testimonial[] = [
    {
      name: 'Ananya Sharma',
      role: 'Parent from Assam',
      quote: 'We came in uncertain, and within one visit we had a shortlist, scholarship direction, and clarity on which campuses truly fit my son.',
      score: '98%',
      metric: 'secured scholarship conversations after counseling',
      avatar: '/avatars/ananya.png',
    },
    {
      name: 'Rahul Mehta',
      role: 'Engineering aspirant',
      quote: 'The expo helped me compare universities side by side and finally understand which programs matched my grades, budget, and long-term goals.',
      score: '3x',
      metric: 'faster shortlisting than researching online alone',
      avatar: '/avatars/rahul.png',
    },
    {
      name: 'Meera Das',
      role: 'Class 12 student',
      quote: 'The counseling desk turned a confusing admissions process into a clear action plan I could actually follow with confidence.',
      score: '91%',
      metric: 'left with a final college shortlist in a single day',
      avatar: '/avatars/meera.png',
    },
  ];

  partnerLogos: string[] = [];
  countdown: CountdownState = { days: '00', hours: '00', minutes: '00', seconds: '00' };
  scrollOffset = 0;
  isUrgencyStuck = false;

  private revealObserver?: IntersectionObserver;
  private countdownTimer?: number;

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private meta: Meta,
    private cdr: ChangeDetectorRef,
  ) {
    const logos: string[] = [];
    for (let index = 1; index <= 32; index += 1) {
      if (index === 8) continue;
      const formatted = index < 10 ? `0${index}` : `${index}`;
      logos.push(`/32 Logos For Web/logos for web-${formatted}.png`);
    }
    this.partnerLogos = logos;
  }

  ngOnInit() {
    this.meta.updateTag({
      name: 'description',
      content: 'Higher Education Exhibition at Edu Carnival. Meet partner universities, explore scholarships, and register for your free education expo pass.',
    });
    this.updateCountdown();
    this.scrollOffset = window.scrollY || 0;
    
    this.countdownTimer = window.setInterval(() => {
      this.updateCountdown();
      this.cdr.detectChanges();
    }, 1000);

    // Trigger celebratory confetti on load
    setTimeout(() => this.triggerConfetti(), 800);
  }

  private triggerConfetti() {
    const end = Date.now() + 3 * 1000;
    const colors = ['#ff0080', '#7928ca', '#ffbd36', '#54b9ff'];

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }

  ngAfterViewInit() {
    this.revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.revealObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    this.revealRefs.forEach((item) => this.revealObserver?.observe(item.nativeElement));
  }

  ngOnDestroy() {
    if (this.countdownTimer) {
      window.clearInterval(this.countdownTimer);
    }
    this.revealObserver?.disconnect();
    document.body.style.overflow = '';
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const scroll = window.scrollY || 0;
    this.scrollOffset = scroll;
    const isDesktop = window.innerWidth >= 768;
    this.isUrgencyStuck = isDesktop && scroll > 650;
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    // No-op
  }

  getCountdownSegments(startDate: string | undefined) {
    if (!startDate) {
      return [
        { label: 'Days', value: '00' },
        { label: 'Hours', value: '00' },
        { label: 'Mins', value: '00' },
        { label: 'Secs', value: '00' },
      ];
    }

    const eventStart = new Date(`${startDate}T09:00:00+05:30`).getTime();
    const diff = Math.max(eventStart - Date.now(), 0);
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [
      { label: 'Days', value: this.formatUnit(days) },
      { label: 'Hours', value: this.formatUnit(hours) },
      { label: 'Mins', value: this.formatUnit(minutes) },
      { label: 'Secs', value: this.formatUnit(seconds) },
    ];
  }

  onMagneticMove(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement | null;
    if (!target) return;
    const bounds = target.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left - bounds.width / 2) / 8;
    const offsetY = (event.clientY - bounds.top - bounds.height / 2) / 8;
    target.style.setProperty('--mx', `${offsetX}px`);
    target.style.setProperty('--my', `${offsetY}px`);
  }

  resetMagnetic(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement | null;
    if (!target) return;
    target.style.setProperty('--mx', '0px');
    target.style.setProperty('--my', '0px');
  }

  private getNextEvent(): City | null {
    const today = new Date();
    const upcoming = this.cities.find((city) => {
      if (!city.start_date) return false;
      const eventDate = new Date(`${city.start_date}T00:00:00+05:30`);
      return eventDate >= today;
    });
    return upcoming ?? this.cities[0] ?? null;
  }

  private updateCountdown() {
    if (!this.nextEvent?.start_date) {
      this.countdown = { days: '00', hours: '00', minutes: '00', seconds: '00' };
      return;
    }

    const eventStart = new Date(`${this.nextEvent.start_date}T09:00:00+05:30`).getTime();
    const diff = Math.max(eventStart - Date.now(), 0);
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    this.countdown = {
      days: this.formatUnit(days),
      hours: this.formatUnit(hours),
      minutes: this.formatUnit(minutes),
      seconds: this.formatUnit(seconds),
    };
  }

  private formatUnit(value: number): string {
    return value.toString().padStart(2, '0');
  }

  getEventDays(startDate: string | undefined): string {
    if (!startDate) return '';
    const date1 = new Date(`${startDate}T00:00:00+05:30`);
    const date2 = new Date(date1);
    date2.setDate(date2.getDate() + 1);
    
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    const day1 = date1.toLocaleDateString('en-US', options);
    const day2 = date2.toLocaleDateString('en-US', options);
    
    return `${day1} & ${day2}`;
  }
}
