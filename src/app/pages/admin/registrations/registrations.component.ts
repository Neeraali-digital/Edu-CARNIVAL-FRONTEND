import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-admin-registrations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-page">
      <div class="page-header">
        <h2>Registrations</h2>
        <button class="primary-btn" (click)="refresh()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh Data
        </button>
      </div>
      
      <div class="tabs">
        <button [class.active]="activeTab === 'exhibitors'" (click)="activeTab = 'exhibitors'">Exhibitors</button>
        <button [class.active]="activeTab === 'participants'" (click)="activeTab = 'participants'">Visitors</button>
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
              <th>Actions</th>
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
              <td>
                <button class="delete-btn" (click)="deleteRegistration(reg.id, 'exhibitor')" title="Delete">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
            <tr *ngIf="exhibitors.length === 0">
               <td colspan="7" class="text-center">No exhibitor registrations yet.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div *ngIf="activeTab === 'participants'">
        <h3>Visitor Registrations</h3>
        <table class="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>School/College</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Interests</th>
              <th>Date</th>
              <th>Actions</th>
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
              <td>
                <button class="delete-btn" (click)="deleteRegistration(reg.id, 'participant')" title="Delete">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
            <tr *ngIf="participants.length === 0">
               <td colspan="7" class="text-center">No visitor registrations yet.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
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
    th { background: #f8f9fa; color: #475569; font-weight: 700; }
    td { color: #1e293b; font-weight: 500; }
    h3 { margin: 1.5rem 0 1rem; color: #1e293b; }
    
    .primary-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: #3498db;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .primary-btn:hover { background: #2980b9; }
    .primary-btn svg { width: 1.25rem; height: 1.25rem; }

    .delete-btn {
      background: #fee2e2;
      color: #ef4444;
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
    }
    .delete-btn:hover { background: #fee2e2; color: #dc2626; transform: scale(1.1); }
    .delete-btn svg { width: 18px; height: 18px; }
    .text-center { text-align: center; color: #64748b; font-style: italic; }
  `]
})
export class AdminRegistrationsComponent implements OnInit {
  exhibitors: any[] = [];
  participants: any[] = [];
  activeTab = 'exhibitors';

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.loadExhibitors();
    this.loadParticipants();
  }

  loadExhibitors() {
    this.api.getAll('registrations/exhibitor').subscribe(data => {
      this.exhibitors = data.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      this.cdr.detectChanges();
    });
  }

  loadParticipants() {
    this.api.getAll('registrations/participant').subscribe(data => {
      this.participants = data.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      this.cdr.detectChanges();
    });
  }

  deleteRegistration(id: number, type: 'exhibitor' | 'participant') {
    if (confirm(`Are you sure you want to delete this ${type} registration?`)) {
      const endpoint = type === 'exhibitor' ? `registrations/exhibitor` : `registrations/participant`;
      this.api.delete(endpoint, id).subscribe(() => {
        this.refresh();
      });
    }
  }
}
