import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  @ViewChild('contactForm') contactForm!: NgForm;
  formData = {
    name: '',
    email: '',
    subject: 'General Inquiry',
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
        sheetName: 'Inquiries',
        _subject: 'New Website Inquiry',
        "Name": this.formData.name,
        "Email": this.formData.email,
        "Subject": this.formData.subject,
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
      this.toast.success('Thank you for contacting us! We will get back to you soon.');
      this.contactForm.resetForm({ subject: 'General Inquiry' });

    } catch (err) {
      console.error('Submission error:', err);
      this.toast.error('Submission failed. Please try again.');
    } finally {
      this.isSubmitting = false;
    }
  }

  resetForm() {
    this.submitted = false;
    this.contactForm.resetForm({ subject: 'General Inquiry' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
