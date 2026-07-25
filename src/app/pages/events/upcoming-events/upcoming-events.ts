import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CITIES } from '../../../data/cities';

@Component({
  selector: 'app-upcoming-events',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './upcoming-events.html',
  styleUrl: './upcoming-events.css'
})
export class UpcomingEventsComponent implements OnInit {
  cities = CITIES;

  get upcomingCities() {
    return this.cities
      .filter(c => !c.is_completed)
      .sort((a, b) => (a.start_date || '').localeCompare(b.start_date || ''));
  }

  get completedCities() {
    return this.cities.filter(c => c.is_completed);
  }

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.cdr.detectChanges();
  }
}
