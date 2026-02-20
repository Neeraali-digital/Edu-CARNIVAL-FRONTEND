import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-participant-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  ngOnInit() {
    const code = localStorage.getItem('edu_carnival_spin_code');
    if (code) {
      this.formData.prize_code = code;
    }
  }

  onSubmit() {
    this.isSubmitting = true;
    this.api.create('registrations/participant', this.formData).subscribe({
      next: (res) => {
        this.submitted = true;
        this.toast.success('Registration successful! Your prize is linked to your registration.', 5000);
        localStorage.setItem('edu_carnival_registered', 'true');
        this.participantForm.resetForm();
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error(err);
        this.toast.error('Registration failed.', 5000);
        this.isSubmitting = false;
      }
    });
  }
}
