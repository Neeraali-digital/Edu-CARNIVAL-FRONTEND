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

  onSubmit() {
    this.isSubmitting = true;
    this.api.create('registrations/exhibitor', this.formData).subscribe({
      next: (res) => {
        this.submitted = true;
        this.toast.success('Registration successful!', 5000);
        this.exhibitorForm.resetForm();
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error(err);
        this.toast.error('Registration failed. Please try again.', 5000);
        this.isSubmitting = false;
      }
    });
  }
}
