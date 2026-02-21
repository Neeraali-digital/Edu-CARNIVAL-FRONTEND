import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-registrations',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
      
      <div class="search-bar">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
          type="text" 
          placeholder="Search by name, email, or phone..." 
          [(ngModel)]="searchQuery" 
          (input)="onSearchChange()"
        >
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
              <th>Location</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let reg of filteredExhibitors">
              <td>{{ reg.full_name }}</td>
              <td>{{ reg.company_name }}</td>
              <td>{{ reg.email }}</td>
              <td>{{ reg.phone_number }}</td>
              <td>{{ reg.location }}</td>
              <td>{{ reg.created_at | date:'short' }}</td>
              <td>
                <div class="action-group">
                    <button class="view-btn" (click)="viewRegistration(reg)" title="View Details">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </button>
                    <button class="delete-btn" (click)="deleteRegistration(reg.id, 'exhibitor')" title="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
              </td>
            </tr>
            <tr *ngIf="filteredExhibitors.length === 0">
               <td colspan="7" class="text-center">No registrations found matching your search.</td>
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
              <th>Prize Code</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let reg of filteredParticipants">
              <td>{{ reg.full_name }}</td>
              <td>{{ reg.school_college }}</td>
              <td>{{ reg.email }}</td>
              <td>{{ reg.phone_number }}</td>
              <td style="color: #d946ef; font-weight: 700;">{{ reg.prize_code || '---' }}</td>
              <td>{{ reg.created_at | date:'short' }}</td>
              <td>
                <div class="action-group">
                    <button class="view-btn" (click)="viewRegistration(reg)" title="View Details">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </button>
                    <button class="delete-btn" (click)="deleteRegistration(reg.id, 'participant')" title="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
              </td>
            </tr>
            <tr *ngIf="filteredParticipants.length === 0">
               <td colspan="7" class="text-center">No registrations found matching your search.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Detail Modal -->
      <div *ngIf="selectedRegistration" class="modal-overlay" (click)="closeModal()">
        <div class="modal-card" (click)="$event.stopPropagation()">
            <div class="modal-header">
                <h3>{{ activeTab === 'exhibitors' ? 'Exhibitor Details' : 'Visitor Details' }}</h3>
                <button class="close-btn" (click)="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Full Name</label>
                        <p>{{ selectedRegistration.full_name }}</p>
                    </div>
                    <div class="detail-item">
                        <label>Email</label>
                        <p>{{ selectedRegistration.email }}</p>
                    </div>
                    <div class="detail-item">
                        <label>Phone</label>
                        <p>{{ selectedRegistration.phone_number }}</p>
                    </div>
                    <div class="detail-item">
                        <label>Date Registered</label>
                        <p>{{ selectedRegistration.created_at | date:'medium' }}</p>
                    </div>
                    
                    <!-- Exhibitor Specifics -->
                    <ng-container *ngIf="activeTab === 'exhibitors'">
                        <div class="detail-item">
                            <label>Institution/Company</label>
                            <p>{{ selectedRegistration.company_name }}</p>
                        </div>
                        <div class="detail-item">
                            <label>Location</label>
                            <p>{{ selectedRegistration.location }}</p>
                        </div>
                        <div class="detail-item full-width">
                            <label>Message</label>
                            <p class="message-box">{{ selectedRegistration.message || 'No message provided.' }}</p>
                        </div>
                    </ng-container>

                    <!-- Visitor Specifics -->
                    <ng-container *ngIf="activeTab === 'participants'">
                        <div class="detail-item">
                            <label>School/College</label>
                            <p>{{ selectedRegistration.school_college }}</p>
                        </div>
                        <div *ngIf="selectedRegistration.prize_code" class="detail-item">
                            <label>Prize Code</label>
                            <p style="color: #d946ef; font-weight: 700;">{{ selectedRegistration.prize_code }}</p>
                        </div>
                        <div class="detail-item full-width">
                            <label>Interests</label>
                            <p>{{ selectedRegistration.interests }}</p>
                        </div>
                    </ng-container>
                </div>
            </div>
            <div class="modal-footer">
                <button class="primary-btn" (click)="closeModal()">Close</button>
            </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-bar {
      margin-bottom: 2rem;
      position: relative;
      display: flex;
      align-items: center;
      background: white;
      border-radius: 12px;
      padding: 0 1rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
    }
    .search-bar svg {
      width: 1.25rem;
      height: 1.25rem;
      color: #94a3b8;
    }
    .search-bar input {
      width: 100%;
      padding: 1rem;
      border: none;
      outline: none;
      font-size: 1rem;
      background: transparent;
      color: #1e293b;
    }
    .search-bar input::placeholder { color: #94a3b8; }

    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
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

    .action-group { display: flex; gap: 0.5rem; }

    .view-btn {
      background: #e0f2fe;
      color: #0284c7;
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
    .view-btn:hover { background: #bae6fd; color: #0369a1; }
    .view-btn svg { width: 18px; height: 18px; }

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

    /* Modal Styles */
    .modal-overlay {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px);
        display: flex; justify-content: center; align-items: center; z-index: 100;
    }
    .modal-card {
        background: white; width: 100%; max-width: 600px; border-radius: 16px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); overflow: hidden;
        animation: slideUp 0.3s ease-out;
    }
    .modal-header {
        padding: 1.5rem; border-bottom: 1px solid #e2e8f0;
        display: flex; justify-content: space-between; align-items: center;
    }
    .modal-header h3 { margin: 0; font-size: 1.25rem; }
    .close-btn { background: none; border: none; font-size: 1.5rem; color: #94a3b8; cursor: pointer; }
    .modal-body { padding: 2rem; max-height: 70vh; overflow-y: auto; }
    
    .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    .detail-item label { display: block; font-size: 0.85rem; color: #64748b; margin-bottom: 0.25rem; font-weight: 600; text-transform: uppercase; }
    .detail-item p { margin: 0; font-size: 1.1rem; color: #1e293b; font-weight: 500; }
    .detail-item.full-width { grid-column: span 2; }
    .message-box { background: #f8fafc; padding: 1rem; border-radius: 8px; border: 1px solid #e2e8f0; color: #475569; }

    .modal-footer { padding: 1.5rem; background: #f8fafc; display: flex; justify-content: flex-end; }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  `]
})
export class AdminRegistrationsComponent implements OnInit {
  exhibitors: any[] = [];
  participants: any[] = [];
  filteredExhibitors: any[] = [];
  filteredParticipants: any[] = [];
  activeTab = 'exhibitors';
  selectedRegistration: any = null;
  searchQuery: string = '';

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
      this.applyFilter();
      this.cdr.detectChanges();
    });
  }

  loadParticipants() {
    this.api.getAll('registrations/participant').subscribe(data => {
      this.participants = data.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      this.applyFilter();
      this.cdr.detectChanges();
    });
  }

  onSearchChange() {
    this.applyFilter();
  }

  applyFilter() {
    const query = this.searchQuery.toLowerCase().trim();
    if (!query) {
      this.filteredExhibitors = [...this.exhibitors];
      this.filteredParticipants = [...this.participants];
    } else {
      this.filteredExhibitors = this.exhibitors.filter(reg =>
        reg.full_name?.toLowerCase().includes(query) ||
        reg.email?.toLowerCase().includes(query) ||
        reg.phone_number?.toLowerCase().includes(query) ||
        reg.company_name?.toLowerCase().includes(query)
      );
      this.filteredParticipants = this.participants.filter(reg =>
        reg.full_name?.toLowerCase().includes(query) ||
        reg.email?.toLowerCase().includes(query) ||
        reg.phone_number?.toLowerCase().includes(query) ||
        reg.school_college?.toLowerCase().includes(query)
      );
    }
    this.cdr.detectChanges();
  }

  viewRegistration(reg: any) {
    this.selectedRegistration = reg;
    this.cdr.detectChanges();
  }

  closeModal() {
    this.selectedRegistration = null;
    this.cdr.detectChanges();
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
