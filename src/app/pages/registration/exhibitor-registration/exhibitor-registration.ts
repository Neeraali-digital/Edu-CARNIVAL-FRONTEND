import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-exhibitor-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exhibitor-registration.html',
  styleUrl: './exhibitor-registration.css'
})
export class ExhibitorRegistrationComponent {
  formData = {
    full_name: '',
    company_name: '',
    email: '',
    phone_number: '',
    category: '',
    message: ''
  };
  submitted = false;

  constructor(private api: ApiService) { }

  onSubmit() {
    this.api.create('registrations/exhibitor', this.formData).subscribe({
      next: (res) => {
        this.submitted = true;
        alert('Registration successful!');
        // Reset form or redirect
      },
      error: (err) => {
        console.error(err);
        alert('Registration failed. Please try again.');
      }
    });
  }
}
