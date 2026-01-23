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
    { id: 'jammu', name: 'Jammu', image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=80&w=1000' },
    { id: 'gangtok', name: 'Gangtok', image: 'https://images.unsplash.com/photo-1589136142558-94675c602490?auto=format&fit=crop&q=80&w=1000' },
    { id: 'imphal', name: 'Imphal', image: 'https://images.unsplash.com/photo-1602419409000-dc9775f0a359?auto=format&fit=crop&q=80&w=1000' },
    { id: 'dimapur', name: 'Dimapur', image: 'https://images.unsplash.com/photo-1620023640707-160350901e8a?auto=format&fit=crop&q=80&w=1000' },
    { id: 'dibrugarh', name: 'Dibrugarh', image: 'https://images.unsplash.com/photo-1598558509355-6df35496420c?auto=format&fit=crop&q=80&w=1000' },
    { id: 'guwahati', name: 'Guwahati', image: 'https://images.unsplash.com/photo-1605370215714-232679fb890c?auto=format&fit=crop&q=80&w=1000' }
  ];
}
