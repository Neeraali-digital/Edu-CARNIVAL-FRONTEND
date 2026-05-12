import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-participant-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './participant-registration.html',
  styleUrl: './participant-registration.css'
})
export class ParticipantRegistrationComponent {
  @ViewChild('participantForm') participantForm!: NgForm;
  formData = {
    full_name: '',
    school_college: '',
    email: '',
    phone_number: '',
    interests: '',
    prize_code: ''
  };
  submitted = false;
  isSubmitting = false;

  constructor(private api: ApiService, private toast: ToastService) { }

  // REPLACE THIS with your Google Web App URL after deployment
  private readonly GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxkx3bwUe9sZPCqqG2S4EuGqwQ9bZF5rOfDDhxXQy2CxT8YowMGnoE-FqFljBSC2Gv-fg/exec';

  ngOnInit() { }

  async onSubmit() {
    this.isSubmitting = true;

    try {
      const payload = {
        sheetName: 'Visitors',
        _subject: 'New Visitor Registration',
        "Full Name": this.formData.full_name,
        "Email": this.formData.email,
        "Phone Number": this.formData.phone_number,
        "School/College": this.formData.school_college,
        "Interests": this.formData.interests,
        "Prize Code": this.formData.prize_code
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
      this.participantForm.resetForm();

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
