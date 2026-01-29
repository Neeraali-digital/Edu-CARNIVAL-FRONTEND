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

  onSubmit() {
    this.isSubmitting = true;
    this.api.create('inquiries', this.formData).subscribe({
      next: (res) => {
        this.toast.success('Thank you for contacting us!');
        this.contactForm.resetForm({ subject: 'General Inquiry' }); // Keep default subject
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error(err);
        this.toast.error('Could not send message. Please try again.');
        this.isSubmitting = false;
      }
    });
  }
}
