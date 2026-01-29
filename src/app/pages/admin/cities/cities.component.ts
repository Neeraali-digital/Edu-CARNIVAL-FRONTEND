import { Component, OnInit } from '@angular/core';
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

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.loadCities();
  }

  loadCities() {
    this.api.getAll('cities').subscribe(data => this.cities = data);
  }

  openModal() {
    this.editingCity = false;
    this.currentCity = {};
    this.selectedFile = null;
    this.showModal = true;
  }

  editCity(city: any) {
    this.editingCity = true;
    this.currentCity = { ...city };
    this.selectedFile = null;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  saveCity() {
    const formData = new FormData();
    formData.append('name', this.currentCity.name);
    formData.append('slug', this.currentCity.slug);
    formData.append('date', this.currentCity.date);
    formData.append('location', this.currentCity.location);
    formData.append('description', this.currentCity.description);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.editingCity) {
      this.api.update('cities', this.currentCity.slug, formData).subscribe(() => {
        this.loadCities();
        this.closeModal();
      });
    } else {
      this.api.create('cities', formData).subscribe(() => {
        this.loadCities();
        this.closeModal();
      });
    }
  }

  deleteCity(slug: string) {
    if (confirm('Are you sure you want to delete this city?')) {
      this.api.delete('cities', slug).subscribe(() => this.loadCities());
    }
  }
}
