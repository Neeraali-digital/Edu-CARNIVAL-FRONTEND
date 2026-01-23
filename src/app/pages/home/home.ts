import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WheelSpinnerComponent } from '../../components/carnival/wheel-spinner/wheel-spinner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, WheelSpinnerComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  cities = [
    { id: 'jammu', name: 'Jammu', image: '/Jammu.jpg' },
    { id: 'gangtok', name: 'Gangtok', image: '/Gangtok.jpg' },
    { id: 'imphal', name: 'Imphal', image: '/Imphal.jpg' },
    { id: 'dimapur', name: 'Dimapur', image: '/Dimapur.jpg' },
    { id: 'dibrugarh', name: 'Dibrugarh', image: '/Dibrugarh.jpg' }
  ];
}
