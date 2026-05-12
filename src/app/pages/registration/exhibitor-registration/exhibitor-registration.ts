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

  // REPLACE THIS with your Google Web App URL after deployment
  private readonly GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxkx3bwUe9sZPCqqG2S4EuGqwQ9bZF5rOfDDhxXQy2CxT8YowMGnoE-FqFljBSC2Gv-fg/exec';

  async onSubmit() {
    this.isSubmitting = true;

    try {
      const payload = {
        sheetName: 'Exhibitors',
        _subject: 'New Exhibitor Registration',
        "Full Name": this.formData.full_name,
        "Company Name": this.formData.company_name,
        "Email": this.formData.email,
        "Phone Number": this.formData.phone_number,
        "Location": this.formData.location,
        "Message": this.formData.message
      };

      // 1. Send email via FormSubmit
      const emailResponse = fetch('https://formsubmit.co/ajax/info@educarnival.in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });

      // 2. Send to Google Sheets
      const sheetResponse = fetch(this.GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload)
      });

      await Promise.all([emailResponse, sheetResponse]);

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

  resetForm() {
    this.submitted = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
