import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-admin-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class AdminGalleryComponent implements OnInit {
  activeTab = 'photos';
  photos: any[] = [];
  videos: any[] = [];

  showPhotoModal = false;
  showVideoModal = false;
  newItem: any = {}; // Shared object for creating items
  selectedFile: File | null = null;
  isSubmitting = false;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadPhotos();
    this.loadVideos();
  }

  loadPhotos() {
    this.api.getAll('photos').subscribe({
      next: (data) => {
        this.photos = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading photos', err)
    });
  }

  loadVideos() {
    this.api.getAll('videos').subscribe({
      next: (data) => {
        this.videos = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading videos', err)
    });
  }

  // Modal Actions
  openPhotoModal() {
    this.newItem = { year: new Date().getFullYear() };
    this.selectedFile = null;
    this.showPhotoModal = true;
  }

  openVideoModal() {
    this.newItem = {};
    this.showVideoModal = true;
  }

  closeModals() {
    this.showPhotoModal = false;
    this.showVideoModal = false;
    this.isSubmitting = false;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // CRUD Operations
  savePhoto() {
    if (!this.newItem.title || !this.selectedFile || !this.newItem.year) {
      alert('Please provide title, year, and image.');
      return;
    }

    this.isSubmitting = true;
    const formData = new FormData();
    formData.append('title', this.newItem.title);
    formData.append('year', this.newItem.year);
    formData.append('image', this.selectedFile);

    this.api.create('photos', formData).subscribe({
      next: () => {
        this.loadPhotos();
        this.closeModals();
      },
      error: (err) => {
        console.error('Upload Error:', err);
        alert('Failed to upload photo.');
        this.isSubmitting = false;
      }
    });
  }

  saveVideo() {
    if (!this.newItem.title || !this.newItem.video_url) return;

    this.isSubmitting = true;
    this.api.create('videos', this.newItem).subscribe({
      next: () => {
        this.loadVideos();
        this.closeModals();
      },
      error: (err) => {
        console.error('Save Error:', err);
        this.isSubmitting = false;
      }
    });
  }

  deletePhoto(id: number) {
    if (confirm('Are you sure you want to delete this photo?')) {
      this.api.delete('photos', id).subscribe(() => this.loadPhotos());
    }
  }

  deleteVideo(id: number) {
    if (confirm('Are you sure you want to delete this video?')) {
      this.api.delete('videos', id).subscribe(() => this.loadVideos());
    }
  }
}
