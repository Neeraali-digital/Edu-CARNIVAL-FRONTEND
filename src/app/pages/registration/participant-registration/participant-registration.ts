import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-participant-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './participant-registration.html',
  styleUrl: './participant-registration.css'
})
export class ParticipantRegistrationComponent {
  formData = {
    full_name: '',
    school_college: '',
    email: '',
    phone_number: '',
    interests: ''
  };
  submitted = false;

  constructor(private api: ApiService) { }

  onSubmit() {
    this.api.create('registrations/participant', this.formData).subscribe({
      next: (res) => {
        this.submitted = true;
        alert('Registration successful!');
      },
      error: (err) => {
        console.error(err);
        alert('Registration failed.');
      }
    });
  }
}
