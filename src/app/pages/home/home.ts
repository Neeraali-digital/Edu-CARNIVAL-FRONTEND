import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
export class HomeComponent implements OnInit {
  cities = CITIES;
  partnerLogos: string[] = [];
  consultancyLogos: string[] = [];

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {
    // Initialize partner logos array
    // Initialize partner logos array - skipping missing logo 08
    for (let i = 1; i <= 32; i++) {
      if (i === 8) continue;
      const logoNum = i < 10 ? `0${i}` : `${i}`;
      this.partnerLogos.push(`32 Logos For Web/logos for web-${logoNum}.png`);
    }

    // Initialize consultancy logos
    this.consultancyLogos = [
      'cosultancy parteners/Wayzon logo Education Consultancy-02.jpg (2).jpeg',
      'cosultancy parteners/WhatsApp Image 2026-04-06 at 16.56.46.jpeg',
      'cosultancy parteners/embark logo png.png'
    ];
  }

  ngOnInit() {
    this.cdr.detectChanges();
  }
}
