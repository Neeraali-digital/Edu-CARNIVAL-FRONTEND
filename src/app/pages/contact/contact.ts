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
  isSubmitting = false;

  constructor(private api: ApiService, private toast: ToastService) { }

  async onSubmit() {
    this.isSubmitting = true;

    try {
      // 1. Submit to backend - COMMENTED OUT
      /*
      try {
        await new Promise<void>((resolve, reject) => {
          this.api.create('inquiries', this.formData).subscribe({
            next: () => resolve(),
            error: (err: any) => reject(err)
          });
        });
      } catch (backendError) {
        console.warn('Backend submission failed:', backendError);
      }
      */

      // 2. Send email directly from frontend using formsubmit.co
      const response = await fetch('https://formsubmit.co/ajax/ajith@neeraali.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Inquiry from Edu Carnival Website - ${this.formData.subject}`,
          "Name": this.formData.name,
          "Email": this.formData.email,
          "Subject": this.formData.subject,
          "Message": this.formData.message
        })
      });

      if (!response.ok) {
        throw new Error('Email service rejected the request.');
      }

      // Success handling
      this.toast.success('Thank you for contacting us!');
      this.contactForm.resetForm({ subject: 'General Inquiry' });

    } catch (err) {
      console.error('Submission error:', err);
      this.toast.error('Could not send message. Please try again.');
    } finally {
      this.isSubmitting = false;
    }
  }
}
