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
    this.api.getAll('photos').subscribe(data => {
      this.groupPhotosByYear(data);
      this.isLoading = false;
      this.cdr.detectChanges();
    });
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
