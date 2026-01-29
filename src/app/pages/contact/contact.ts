import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(private api: ApiService) { }

  onSubmit() {
    this.api.create('inquiries', this.formData).subscribe({
      next: (res) => {
        alert('Thank you for contacting us!');
        this.formData = { name: '', email: '', subject: '', message: '' };
      },
      error: (err) => {
        console.error(err);
        alert('Could not send message.');
      }
    });
  }
}
