import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';

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
    }).slice(0, 2); // Show next 2 venues
  }

  readonly nextEvent = this.getNextEvent();
  readonly degreeOptions = [
    'Engineering & Technology',
    'Business & Management',
    'Medical & Health Sciences',
    'Design, Media & Creative Arts',
    'Law, Humanities & Social Sciences',
    'Study Abroad / Not Sure Yet',
  ];
  readonly agendaTabs: AgendaTab[] = [
    {
      key: 'workshops',
      label: 'Workshops',
      kicker: 'Hands-on strategy labs',
      description:
        'Rapid-fire sessions built to help students shortlist the right country, course, and campus without the usual confusion.',
      sessions: [
        {
          time: '10:00 AM',
          title: 'Future-Proof Career Mapping',
          speaker: 'Admissions Strategy Desk',
          highlight: 'Decode high-growth degrees and career pathways.',
        },
        {
          time: '11:30 AM',
          title: 'Scholarship Playbook 2026',
          speaker: 'Funding Advisors Panel',
          highlight: 'Understand merit, need-based, and profile-based funding.',
        },
        {
          time: '1:00 PM',
          title: 'Profile Building for Global Universities',
          speaker: 'Student Success Mentors',
          highlight: 'Learn what makes an application stand out early.',
        },
        {
          time: '3:00 PM',
          title: 'Parents Decision-Making Clinic',
          speaker: 'Counseling Success Team',
          highlight: 'Compare ROI, safety, and academic outcomes in one session.',
        },
      ],
    },
    {
      key: 'counseling',
      label: 'Counseling',
      kicker: '1:1 expert guidance',
      description:
        'Short, practical counseling blocks focused on admissions fit, financial clarity, and the next action for every student profile.',
      sessions: [
        {
          time: '10:15 AM',
          title: 'Personal University Match Session',
          speaker: 'Regional Counseling Team',
          highlight: 'Shortlist best-fit campuses by score, budget, and goals.',
        },
        {
          time: '12:00 PM',
          title: 'Scholarship Readiness Review',
          speaker: 'Funding Review Desk',
          highlight: 'Check eligibility and timeline for scholarship applications.',
        },
        {
          time: '2:15 PM',
          title: 'Application Roadmap Sprint',
          speaker: 'Admissions Support Cell',
          highlight: 'Leave with a clear step-by-step admissions checklist.',
        },
        {
          time: '4:00 PM',
          title: 'Parent Q&A Lounge',
          speaker: 'Counselors and Alumni Parents',
          highlight: 'Get clear answers on accommodation, cost, and safety.',
        },
      ],
    },
    {
      key: 'speakers',
      label: 'Guest Speakers',
      kicker: 'Stories from people who have done it',
      description:
        'A curated line-up of speakers sharing real scholarship wins, admissions lessons, and the mindset needed to move confidently.',
      sessions: [
        {
          time: '11:00 AM',
          title: 'How Students Secure Better Offers Faster',
          speaker: 'Director of International Outreach',
          highlight: 'What top applications do differently before submissions open.',
        },
        {
          time: '12:45 PM',
          title: 'Scholarship Success Stories',
          speaker: 'Recent Scholarship Recipients',
          highlight: 'Real examples of profiles that unlocked funding.',
        },
        {
          time: '2:45 PM',
          title: 'Choosing the Right Country in 2026',
          speaker: 'Global Education Analyst',
          highlight: 'Compare destinations using cost, employability, and fit.',
        },
        {
          time: '4:30 PM',
          title: 'Ask-Me-Anything with Alumni Mentors',
          speaker: 'Student Alumni Circle',
          highlight: 'Hear direct, practical insights from recent graduates.',
        },
      ],
    },
  ];
  readonly testimonials: Testimonial[] = [
    {
      name: 'Ananya Sharma',
      role: 'Parent from Assam',
      quote:
        'We came in uncertain, and within one visit we had a shortlist, scholarship direction, and clarity on which campuses truly fit my son.',
      score: '98%',
      metric: 'secured scholarship conversations after counseling',
      avatar: 'https://i.pravatar.cc/150?u=ananya',
    },
    {
      name: 'Rahul Mehta',
      role: 'Engineering aspirant',
      quote:
        'The expo helped me compare universities side by side and finally understand which programs matched my grades, budget, and long-term goals.',
      score: '3x',
      metric: 'faster shortlisting than researching online alone',
      avatar: 'https://i.pravatar.cc/150?u=rahul',
    },
    {
      name: 'Meera Das',
      role: 'Class 12 student',
      quote:
        'The counseling desk turned a confusing admissions process into a clear action plan I could actually follow with confidence.',
      score: '91%',
      metric: 'left with a final college shortlist in a single day',
      avatar: 'https://i.pravatar.cc/150?u=meera',
    },
  ];

  partnerLogos: string[] = [];
  activeAgendaKey = 'workshops';
  countdown: CountdownState = {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  };
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
      if (index === 8) {
        continue;
      }
      const formatted = index < 10 ? `0${index}` : `${index}`;
      logos.push(`32 Logos For Web/logos for web-${formatted}.png`);
    }
    this.partnerLogos = logos;
  }

  ngOnInit() {
    this.meta.updateTag({
      name: 'description',
      content:
        'Unlock Your Global Future at Edu Carnival. Meet partner universities, explore scholarships, and register for your free education expo pass.',
    });
    this.updateCountdown();
    this.scrollOffset = window.scrollY || 0;
    this.countdownTimer = window.setInterval(() => {
      this.updateCountdown();
      this.cdr.detectChanges();
    }, 1000);
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

    // Detect if urgency section should be stuck (compact mode)
    // The hero section is roughly 600-800px.
    this.isUrgencyStuck = scroll > 400;
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    // No-op
  }

  get activeAgenda(): AgendaTab {
    return this.agendaTabs.find((item) => item.key === this.activeAgendaKey) ?? this.agendaTabs[0];
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

  setAgenda(key: string) {
    this.activeAgendaKey = key;
  }

  onMagneticMove(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement | null;
    if (!target) {
      return;
    }
    const bounds = target.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left - bounds.width / 2) / 8;
    const offsetY = (event.clientY - bounds.top - bounds.height / 2) / 8;
    target.style.setProperty('--mx', `${offsetX}px`);
    target.style.setProperty('--my', `${offsetY}px`);
  }

  resetMagnetic(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement | null;
    if (!target) {
      return;
    }
    target.style.setProperty('--mx', '0px');
    target.style.setProperty('--my', '0px');
  }

  private getNextEvent(): City | null {
    const today = new Date();
    const upcoming = this.cities.find((city) => {
      if (!city.start_date) {
        return false;
      }
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
}
