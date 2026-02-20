import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-admin-cities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.css'
})
export class AdminCitiesComponent implements OnInit {
  cities: any[] = [];
  showModal = false;
  editingCity = false;
  currentCity: any = {};
  selectedFile: File | null = null;
  isSubmitting = false;
  originalSlug = '';

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadCities();
  }

  loadCities() {
    this.api.getAll('cities').subscribe(data => {
      this.cities = data;
      this.cdr.detectChanges();
    });
  }

  openModal() {
    this.editingCity = false;
    this.currentCity = {};
    this.selectedFile = null;
    this.originalSlug = '';
    this.showModal = true;
  }

  editCity(city: any) {
    this.editingCity = true;
    this.currentCity = { ...city };
    this.originalSlug = city.slug; // Store original slug for API lookup
    this.selectedFile = null;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.isSubmitting = false;
    this.cdr.detectChanges();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  saveCity() {
    this.isSubmitting = true;
    const formData = new FormData();
    formData.append('name', this.currentCity.name);
    formData.append('slug', this.currentCity.slug);
    if (this.currentCity.description) formData.append('description', this.currentCity.description);
    if (this.currentCity.date) formData.append('date', this.currentCity.date);
    if (this.currentCity.start_date) formData.append('start_date', this.currentCity.start_date);
    if (this.currentCity.end_date) formData.append('end_date', this.currentCity.end_date);
    formData.append('is_current_expo', this.currentCity.is_current_expo ? 'true' : 'false');
    if (this.currentCity.location) formData.append('location', this.currentCity.location);
    if (this.currentCity.place) formData.append('place', this.currentCity.place);
    if (this.currentCity.regional_representative) formData.append('regional_representative', this.currentCity.regional_representative);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    const request$ = this.editingCity
      ? this.api.update('cities', this.originalSlug, formData)
      : this.api.create('cities', formData);

    request$.subscribe({
      next: (res) => {
        this.loadCities();
        this.closeModal();
      },
      error: (err) => {
        console.error('Error saving city:', err);
        alert('Failed to save city. Please check console for details.');
        this.isSubmitting = false;
        this.cdr.detectChanges();
      }
    });
  }

  deleteCity(slug: string) {
    if (confirm('Are you sure you want to delete this city?')) {
      this.api.delete('cities', slug).subscribe(() => this.loadCities());
    }
  }
}
