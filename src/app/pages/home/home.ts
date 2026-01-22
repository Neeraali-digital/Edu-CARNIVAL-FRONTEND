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
    { name: 'Jammu', image: 'https://images.unsplash.com/photo-1566838318109-a8e4dfdffa43?q=80&w=1974&auto=format&fit=crop' },
    { name: 'Gangtok', image: 'https://images.unsplash.com/photo-1626601131974-98ae8681283a?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Imphal', image: 'https://images.unsplash.com/photo-1605634575914-724bf29ac1b5?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Dimapur', image: 'https://images.unsplash.com/photo-1599818817666-da644cb3f223?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Dibrugarh', image: 'https://images.unsplash.com/photo-1598558509355-6df35496420c?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Guwahati', image: 'https://images.unsplash.com/photo-1605370215714-232679fb890c?q=80&w=2070&auto=format&fit=crop' }
  ];
}
