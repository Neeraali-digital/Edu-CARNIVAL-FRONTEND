import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-admin-inquiries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inquiries.component.html',
  styleUrl: './inquiries.component.css'
})
export class AdminInquiriesComponent implements OnInit {
  inquiries: any[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAll('inquiries').subscribe(data => {
      // Sort by date descending
      this.inquiries = data.sort((a: any, b: any) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
  }

  deleteInquiry(id: number) {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      this.api.delete('inquiries', id).subscribe(() => {
        this.inquiries = this.inquiries.filter(i => i.id !== id);
      });
    }
  }
}
