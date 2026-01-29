import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';

@Component({
    selector: 'app-admin-registrations',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="admin-page">
      <h2>Registrations</h2>
      
      <div class="tabs">
        <button [class.active]="activeTab === 'exhibitors'" (click)="activeTab = 'exhibitors'">Exhibitors</button>
        <button [class.active]="activeTab === 'participants'" (click)="activeTab = 'participants'">Participants</button>
      </div>

      <div *ngIf="activeTab === 'exhibitors'">
        <h3>Exhibitor Registrations</h3>
        <table class="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Category</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let reg of exhibitors">
              <td>{{ reg.full_name }}</td>
              <td>{{ reg.company_name }}</td>
              <td>{{ reg.email }}</td>
              <td>{{ reg.phone_number }}</td>
              <td>{{ reg.category }}</td>
              <td>{{ reg.created_at | date:'short' }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div *ngIf="activeTab === 'participants'">
        <h3>Participant Registrations</h3>
        <table class="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>School/College</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Interests</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let reg of participants">
              <td>{{ reg.full_name }}</td>
              <td>{{ reg.school_college }}</td>
              <td>{{ reg.email }}</td>
              <td>{{ reg.phone_number }}</td>
              <td>{{ reg.interests }}</td>
              <td>{{ reg.created_at | date:'short' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
    styles: [`
    .tabs { margin-bottom: 2rem; border-bottom: 2px solid #eee; }
    .tabs button { 
      padding: 1rem 2rem; 
      background: none; 
      border: none; 
      cursor: pointer; 
      font-weight: 600; 
      color: #7f8c8d; 
    }
    .tabs button.active { 
      color: #3498db; 
      border-bottom: 2px solid #3498db; 
      margin-bottom: -2px; 
    }
    .data-table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    th, td { padding: 1rem; text-align: left; border-bottom: 1px solid #eee; }
    th { background: #f8f9fa; color: #666; font-weight: 600; }
    h3 { margin: 1.5rem 0 1rem; color: #2c3e50; }
  `]
})
export class AdminRegistrationsComponent implements OnInit {
    exhibitors: any[] = [];
    participants: any[] = [];
    activeTab = 'exhibitors';

    constructor(private api: ApiService) { }

    ngOnInit() {
        this.loadExhibitors();
        this.loadParticipants();
    }

    loadExhibitors() {
        this.api.getAll('registrations/exhibitor').subscribe(data => this.exhibitors = data);
    }

    loadParticipants() {
        this.api.getAll('registrations/participant').subscribe(data => this.participants = data);
    }
}
