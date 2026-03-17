import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WheelSpinnerComponent } from '../../components/carnival/wheel-spinner/wheel-spinner.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, WheelSpinnerComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  cities: any[] = [];
  partnerLogos: string[] = [];

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {
    // Initialize partner logos array
    for (let i = 1; i <= 32; i++) {
      const logoNum = i < 10 ? `0${i}` : `${i}`;
      this.partnerLogos.push(`32 Logos For Web/logos for web-${logoNum}.png`);
    }
  }

  ngOnInit() {
    this.api.getAll('cities').subscribe(data => {
      this.cities = data;
      this.cdr.detectChanges();
    });
  }
}
