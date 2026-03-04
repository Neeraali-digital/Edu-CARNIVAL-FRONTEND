import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-exhibitor-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exhibitor-registration.html',
  styleUrl: './exhibitor-registration.css'
})
export class ExhibitorRegistrationComponent {
  @ViewChild('exhibitorForm') exhibitorForm!: NgForm;
  formData = {
    full_name: '',
    company_name: '',
    email: '',
    phone_number: '',
    location: '',
    message: ''
  };
  submitted = false;
  isSubmitting = false;

  constructor(private api: ApiService, private toast: ToastService) { }

  async onSubmit() {
    this.isSubmitting = true;

    try {
      // 1. Submit to backend (if available)
      try {
        await new Promise<void>((resolve, reject) => {
          this.api.create('registrations/exhibitor', this.formData).subscribe({
            next: () => resolve(),
            error: (err: any) => reject(err)
          });
        });
      } catch (backendError) {
        console.warn('Backend submission skipped or failed, proceeding with frontend email:', backendError);
      }

      // 2. Send email directly from frontend using formsubmit.co
      const response = await fetch('https://formsubmit.co/ajax/connect@neeraali.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: 'New Exhibitor Registration - Edu Carnival',
          "Full Name": this.formData.full_name,
          "Company Name": this.formData.company_name,
          "Email": this.formData.email,
          "Phone Number": this.formData.phone_number,
          "Location": this.formData.location,
          "Message": this.formData.message
        })
      });

      if (!response.ok) {
        throw new Error('Email service rejected the request.');
      }

      // Success handling
      this.submitted = true;
      this.toast.success('Registration successful!', 5000);
      this.exhibitorForm.resetForm();

    } catch (err) {
      console.error('Submission error:', err);
      this.toast.error('Registration failed. Please try again.', 5000);
    } finally {
      this.isSubmitting = false;
    }
  }
}
