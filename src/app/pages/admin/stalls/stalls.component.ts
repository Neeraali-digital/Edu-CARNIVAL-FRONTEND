import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-admin-stalls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stalls.component.html',
  styleUrl: './stalls.component.css'
})
export class AdminStallsComponent implements OnInit {
  stalls: any[] = [];
  bookings: any[] = [];
  cities: any[] = [];
  activeTab = 'stalls';
  showModal = false;
  editingStall = false;
  currentStall: any = {};
  selectedFile: File | null = null;
  isSubmitting = false;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.refresh();
    this.loadCities();
  }

  refresh() {
    this.loadStalls();
    this.loadBookings();
  }

  loadCities() {
    this.api.getAll('cities').subscribe(data => {
      this.cities = data;
      console.log('Loaded cities:', this.cities.length);
      this.cdr.detectChanges();
    });
  }

  loadStalls() {
    this.api.getAll('stalls').subscribe(data => {
      this.stalls = data;
      this.cdr.detectChanges();
    });
  }

  loadBookings() {
    this.api.getAll('stall-bookings').subscribe(data => {
      this.bookings = data.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      this.cdr.detectChanges();
    });
  }

  openModal() {
    this.editingStall = false;
    this.currentStall = {};
    this.selectedFile = null;
    this.showModal = true;
  }

  editStall(stall: any) {
    this.editingStall = true;
    this.currentStall = { ...stall };
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

  saveStall() {
    this.isSubmitting = true;
    const formData = new FormData();
    formData.append('title', this.currentStall.title);
    formData.append('price', this.currentStall.price); // Beware, if undefined
    if (this.currentStall.description) formData.append('description', this.currentStall.description);
    if (this.currentStall.city) formData.append('city', this.currentStall.city);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    const request$ = this.editingStall
      ? this.api.update('stalls', this.currentStall.id, formData)
      : this.api.create('stalls', formData);

    request$.subscribe({
      next: () => {
        this.refresh();
        this.closeModal();
      },
      error: (err) => {
        console.error('Error saving stall:', err);
        this.isSubmitting = false;
      }
    });
  }

  deleteStall(id: number) {
    if (confirm('Are you sure you want to delete this stall?')) {
      this.api.delete('stalls', id).subscribe(() => this.refresh());
    }
  }
}
