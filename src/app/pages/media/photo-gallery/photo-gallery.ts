import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-photo-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-gallery.html',
  styleUrl: './photo-gallery.css'
})
export class PhotoGalleryComponent implements OnInit {
  groupedPhotos: { year: number, photos: any[] }[] = [];

  isLoading = true;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.isLoading = true;
    
    // Static data for past events
    const staticPhotos = [
      { id: 1, year: 2025, title: 'Hyatt Hotel, Bangalore', image: '/2025/WhatsApp Image 2026-04-01 at 14.14.41.jpeg' },
      { id: 2, year: 2025, title: 'Event Highlights', image: '/2025/WhatsApp Image 2026-04-01 at 14.14.42.jpeg' },
      { id: 3, year: 2025, title: 'Registration Desk', image: '/2025/WhatsApp Image 2026-04-01 at 14.14.43.jpeg' },
      { id: 4, year: 2025, title: 'Student Interaction', image: '/2025/WhatsApp Image 2026-04-01 at 14.14.44 (1).jpeg' },
      { id: 5, year: 2025, title: 'Inquiry Session', image: '/2025/WhatsApp Image 2026-04-01 at 14.14.44.jpeg' },
      { id: 6, year: 2025, title: 'University Stall', image: '/2025/WhatsApp Image 2026-04-01 at 14.14.45 (1).jpeg' },
      { id: 7, year: 2025, title: 'Expert Guidance', image: '/2025/WhatsApp Image 2026-04-01 at 14.14.45 (2).jpeg' },
      { id: 8, year: 2025, title: 'Career Counselling', image: '/2025/WhatsApp Image 2026-04-01 at 14.14.45.jpeg' },
      { id: 9, year: 2025, title: 'Institutional Presentation', image: '/2025/WhatsApp Image 2026-04-01 at 14.14.46 (1).jpeg' },
      { id: 10, year: 2025, title: 'Campus Insight', image: '/2025/WhatsApp Image 2026-04-01 at 14.14.46 (2).jpeg' },
      { id: 11, year: 2025, title: 'Expo Atmosphere', image: '/2025/WhatsApp Image 2026-04-01 at 14.14.46 (3).jpeg' },
      { id: 12, year: 2025, title: 'Interactive Sessions', image: '/2025/WhatsApp Image 2026-04-01 at 14.14.46.jpeg' },
      { id: 13, year: 2025, title: 'University Information', image: '/2025/WhatsApp Image 2026-04-01 at 14.14.47 (1).jpeg' },
      { id: 14, year: 2025, title: 'Attendee Engagement', image: '/2025/WhatsApp Image 2026-04-01 at 14.14.47 (2).jpeg' },
      { id: 15, year: 2025, title: 'Networking Hub', image: '/2025/WhatsApp Image 2026-04-01 at 14.14.47.jpeg' },
      { id: 16, year: 2025, title: 'Advisory Panel', image: '/2025/WhatsApp Image 2026-04-01 at 14.14.48 (1).jpeg' },
      { id: 17, year: 2025, title: 'Global Education', image: '/2025/WhatsApp Image 2026-04-01 at 14.14.48 (2).jpeg' },
      { id: 18, year: 2025, title: 'Event Overview', image: '/2025/WhatsApp Image 2026-04-01 at 14.14.48.jpeg' },
      { id: 19, year: 2025, title: 'Future Prospects', image: '/2025/WhatsApp Image 2026-04-01 at 14.14.49 (1).jpeg' },
      { id: 20, year: 2025, title: 'Higher Education Expo', image: '/2025/WhatsApp Image 2026-04-01 at 14.14.49 (2).jpeg' },
      { id: 21, year: 2025, title: 'Knowledge Exchange', image: '/2025/WhatsApp Image 2026-04-01 at 14.14.49 (3).jpeg' },
      { id: 22, year: 2025, title: 'Success Stories', image: '/2025/WhatsApp Image 2026-04-01 at 14.14.49.jpeg' },
      { id: 23, year: 2025, title: 'Final Session', image: '/2025/WhatsApp Image 2026-04-01 at 14.14.50.jpeg' },
      { id: 24, year: 2024, title: 'ITC', image: '/2024/WhatsApp Image 2026-04-02 at 12.46.49.jpeg' },
      { id: 25, year: 2024, title: 'ITC', image: '/2024/WhatsApp Image 2026-04-02 at 12.46.49 (1).jpeg' },
      { id: 26, year: 2024, title: 'ITC', image: '/2024/WhatsApp Image 2026-04-02 at 12.46.49 (2).jpeg' },
      { id: 27, year: 2024, title: 'ITC', image: '/2024/WhatsApp Image 2026-04-02 at 12.46.50.jpeg' },
      { id: 28, year: 2024, title: 'ITC', image: '/2024/WhatsApp Image 2026-04-02 at 12.46.50 (1).jpeg' },
      { id: 29, year: 2024, title: 'ITC', image: '/2024/WhatsApp Image 2026-04-02 at 12.46.50 (2).jpeg' },
      { id: 30, year: 2024, title: 'ITC', image: '/2024/WhatsApp Image 2026-04-02 at 12.46.51.jpeg' },
      { id: 31, year: 2018, title: 'Guwahati & Shillong', image: '/2018/WhatsApp Image 2026-04-01 at 14.37.27 (1).jpeg' },
      { id: 32, year: 2018, title: 'Exhibition Highlights', image: '/2018/WhatsApp Image 2026-04-01 at 14.37.27 (2).jpeg' },
      { id: 33, year: 2018, title: 'Student Interaction', image: '/2018/WhatsApp Image 2026-04-01 at 14.37.27.jpeg' },
      { id: 34, year: 2018, title: 'Academic Counseling', image: '/2018/WhatsApp Image 2026-04-01 at 14.37.28.jpeg' },
      { id: 35, year: 2018, title: 'Institutional Booth', image: '/2018/WhatsApp Image 2026-04-01 at 14.37.30 (1).jpeg' },
      { id: 36, year: 2018, title: 'Learning Expo', image: '/2018/WhatsApp Image 2026-04-01 at 14.37.30.jpeg' },
      { id: 37, year: 2018, title: 'Collaborative Space', image: '/2018/WhatsApp Image 2026-04-01 at 14.37.31 (1).jpeg' },
      { id: 38, year: 2018, title: 'Networking Hub', image: '/2018/WhatsApp Image 2026-04-01 at 14.37.31.jpeg' }
    ];

    this.groupPhotosByYear(staticPhotos);
    this.isLoading = false;
    this.cdr.detectChanges();
  }

  groupPhotosByYear(photos: any[]) {
    const groups: { [key: number]: any[] } = {};

    photos.forEach(photo => {
      const year = photo.year || new Date().getFullYear(); // Default to current year if missing
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(photo);
    });

    // Convert to array and sort by year descending
    this.groupedPhotos = Object.keys(groups)
      .map(year => ({ year: parseInt(year), photos: groups[parseInt(year)] }))
      .sort((a, b) => b.year - a.year);
  }
}
