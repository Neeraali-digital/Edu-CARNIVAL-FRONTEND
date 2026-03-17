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

  async onSubmit() {
    this.isSubmitting = true;

    try {
      // 1. Submit to backend - COMMENTED OUT
      /*
      try {
        await new Promise<void>((resolve, reject) => {
          this.api.create('registrations/participant', this.formData).subscribe({
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
          _subject: 'New Visitor Registration - Edu Carnival',
          "Full Name": this.formData.full_name, 
          "School/College": this.formData.school_college,
          "Email": this.formData.email,
          "Phone Number": this.formData.phone_number,
          "Interests/Queries": this.formData.interests,
          "Prize Code": this.formData.prize_code || 'None'
        })
      });

      if (!response.ok) {
        throw new Error('Email service rejected the request.');
      }

      // Success handling
      this.submitted = true;
      this.toast.success('Registration successful! Your prize is linked to your registration.', 5000);
      localStorage.setItem('edu_carnival_registered', 'true');
      this.participantForm.resetForm();

    } catch (err) {
      console.error('Submission error:', err);
      this.toast.error('Registration failed. Please try again.', 5000);
    } finally {
      this.isSubmitting = false;
    }
  }
}
