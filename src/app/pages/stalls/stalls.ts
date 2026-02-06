import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-stalls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stalls.html',
  styleUrl: './stalls.css',
})
export class StallsComponent implements OnInit {
  stalls: any[] = [];
  cities: any[] = [];
  showModal = false;
  selectedStall: any = null;

  @ViewChild('bookingForm') bookingForm!: NgForm;

  bookingData = {
    name: '',
    email: '',
    phone: ''
  };
  isSubmitting = false;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef, private toast: ToastService) { }

  ngOnInit() {
    this.loadStalls();
    // Cities loaded internally via stalls relation
  }

  loadStalls() {
    this.api.getAll('stalls').subscribe(data => {
      this.stalls = data;
      this.cdr.detectChanges();
    });
  }

  // loadCities removed as not needed directly

  openBookingModal(stall: any) {
    this.selectedStall = stall;
    this.showModal = true;
  }

  closeBookingModal() {
    this.showModal = false;
    this.selectedStall = null;
    this.bookingData = { name: '', email: '', phone: '' };
    this.isSubmitting = false;
  }

  submitBooking() {
    if (!this.selectedStall) return;

    this.isSubmitting = true;
    const payload = {
      ...this.bookingData,
      stall: this.selectedStall.id,
      city: this.selectedStall.city_details?.id
    };

    this.api.create('stall-bookings', payload).subscribe({
      next: () => {
        console.log('Booking success callback');
        console.log('Triggering toast...');
        this.toast.success('Stall booked successfully! We will contact you soon.', 5000);
        this.closeBookingModal();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Booking failed', err);
        this.toast.error('Booking failed. Please try again.', 5000);
        this.isSubmitting = false;
      }
    });
  }
}
