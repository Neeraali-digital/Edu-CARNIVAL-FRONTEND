import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-admin-wheel-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-page">
      <div class="page-header">
        <h2 class="dark-text page-title">Wheel & Prizes Management</h2>
        <button class="refresh-btn" (click)="refresh()" [disabled]="isLoading">
          <svg xmlns="http://www.w3.org/2000/svg" [class.animate-spin]="isLoading" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {{ isLoading ? 'Refreshing...' : 'Refresh Data' }}
        </button>
      </div>
      
      <div class="tabs">
        <button [class.active]="activeTab === 'winners'" (click)="activeTab = 'winners'">Spin Winners</button>
        <button [class.active]="activeTab === 'prizes'" (click)="activeTab = 'prizes'">Prize Inventory</button>
      </div>

      <!-- Winners Tab -->
      <div *ngIf="activeTab === 'winners'">
        <div class="section-header">
          <h3 class="dark-text">Recent Winners</h3>
          <span class="badge">{{ winners.length }} Total Spins</span>
        </div>
        
        <table class="data-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Prize</th>
              <th>IP Address</th>
              <th>Claimed Status</th>
              <th>Date & Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let winner of winners">
              <td><code class="code-pill">{{ winner.unique_code }}</code></td>
              <td>
                <span class="prize-tag" [style.background-color]="winner.prize_details?.color + '22'" [style.color]="winner.prize_details?.color">
                  {{ winner.prize_details?.name }}
                </span>
              </td>
              <td class="text-slate-500">{{ winner.ip_address }}</td>
              <td>
                <span class="status-badge" [class.claimed]="winner.is_claimed" [class.pending]="!winner.is_claimed">
                  {{ winner.is_claimed ? 'Claimed' : 'Pending Verification' }}
                </span>
              </td>
              <td class="text-slate-700 font-semibold">{{ winner.created_at | date:'medium' }}</td>
              <td>
                <button *ngIf="!winner.is_claimed" class="claim-btn" (click)="toggleClaim(winner)">
                  Mark Claimed
                </button>
                <button *ngIf="winner.is_claimed" class="unclaim-btn" (click)="toggleClaim(winner)">
                  Reset
                </button>
              </td>
            </tr>
            <tr *ngIf="winners.length === 0">
               <td colspan="6" class="text-center text-slate-400">No winners recorded yet.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Prizes Tab -->
      <div *ngIf="activeTab === 'prizes'">
        <div class="section-header">
          <h3 class="dark-text">Inventory Status</h3>
        </div>
        
        <div class="prize-grid">
           <div *ngFor="let prize of prizes" class="prize-card" [class.inactive]="!prize.is_active">
              <div class="prize-color-bar" [style.background-color]="prize.color"></div>
              <div class="prize-content">
                <div class="prize-header">
                  <h4 class="dark-text">{{ prize.name }}</h4>
                  <label class="switch">
                    <input type="checkbox" [checked]="prize.is_active" (change)="togglePrizeActive(prize)">
                    <span class="slider round"></span>
                  </label>
                </div>
                
                <div class="stats-row">
                  <div class="stat">
                    <label>Remaining</label>
                    <div class="value" [class.low-stock]="prize.remaining_quantity < 5">
                      {{ prize.remaining_quantity }}
                    </div>
                  </div>
                  <div class="stat">
                    <label>Total Stock</label>
                    <div class="value">{{ prize.total_quantity }}</div>
                  </div>
                  <div class="stat">
                    <label>Weight</label>
                    <div class="value">{{ prize.weight }}%</div>
                  </div>
                </div>

                <div class="prize-actions">
                  <button class="edit-btn" (click)="editPrize(prize)">Update Stock</button>
                </div>
              </div>
           </div>
        </div>
      </div>

      <!-- Edit Stock Modal -->
      <div *ngIf="selectedPrize" class="modal-overlay" (click)="closeModal()">
        <div class="modal-card" (click)="$event.stopPropagation()">
            <div class="modal-header">
                <h3 class="dark-text">Update Stock: {{ selectedPrize.name }}</h3>
                <button class="close-btn" (click)="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="dark-text">Remaining Quantity</label>
                    <input type="number" [(ngModel)]="editData.remaining_quantity" class="form-input">
                </div>
                <div class="form-group">
                    <label class="dark-text">Total Quantity</label>
                    <input type="number" [(ngModel)]="editData.total_quantity" class="form-input">
                </div>
                <div class="form-group">
                    <label class="dark-text">Winning Probability Weight</label>
                    <input type="number" [(ngModel)]="editData.weight" class="form-input">
                    <p class="help-text">Higher value = higher chance of winning.</p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="secondary-btn" (click)="closeModal()">Cancel</button>
                <button class="primary-btn-save" (click)="savePrize()">Save Changes</button>
            </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-page { color: #1e293b; }
    .dark-text { color: #334155 !important; }
    
    .page-title {
      font-size: 1.875rem;
      font-weight: 700;
      color: #4b2c85 !important;
      margin: 0;
    }

    .page-header { 
      background: white;
      padding: 1.5rem 2rem;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      margin-bottom: 2rem; 
    }

    .refresh-btn {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      background: #7c3aed;
      color: white;
      border: none;
      padding: 0.8rem 1.4rem;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 6px -1px rgba(124, 58, 237, 0.2);
    }
    .refresh-btn:hover:not(:disabled) {
      background: #6d28d9;
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(124, 58, 237, 0.3);
    }
    .refresh-btn:active { transform: translateY(0); }
    .refresh-btn:disabled { opacity: 0.7; cursor: not-allowed; }
    .refresh-btn svg { width: 1.2rem; height: 1.2rem; }

    .section-header { display: flex; align-items: center; gap: 1rem; margin: 1.5rem 0 1rem; }
    .tabs { margin-bottom: 2rem; border-bottom: 2px solid #e2e8f0; }
    .tabs button { 
      padding: 1rem 2rem; 
      background: none; 
      border: none; 
      cursor: pointer; 
      font-weight: 600; 
      color: #94a3b8; 
      transition: all 0.2s;
    }
    .tabs button.active { 
      color: #7c3aed; 
      border-bottom: 3px solid #7c3aed; 
      margin-bottom: -1.5px; 
    }

    .badge { background: #f5f3ff; color: #7c3aed; padding: 0.3rem 0.8rem; border-radius: 99px; font-size: 0.75rem; font-weight: 700; }

    /* Tables */
    .data-table { width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.03); }
    th, td { padding: 1.25rem 1rem; text-align: left; border-bottom: 1px solid #f1f5f9; color: #475569; }
    th { background: #f8fafc; color: #64748b; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 800; }
    
    .code-pill { background: #f8fafc; border: 1px solid #e2e8f0; padding: 0.3rem 0.6rem; border-radius: 6px; font-family: 'Monaco', monospace; font-weight: 700; color: #475569; font-size: 0.85rem; }
    .prize-tag { padding: 0.3rem 0.8rem; border-radius: 99px; font-size: 0.8rem; font-weight: 700; }
    
    .status-badge { padding: 0.3rem 0.8rem; border-radius: 99px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }
    .status-badge.claimed { background: #dcfce7; color: #15803d; }
    .status-badge.pending { background: #fff7ed; color: #c2410c; border: 1px solid #ffedd5; }

    /* Prize Cards */
    .prize-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
    .prize-card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.03); position: relative; transition: all 0.3s ease; border: 1px solid #f1f5f9; }
    .prize-card:hover { transform: translateY(-4px); box-shadow: 0 12px 20px -5px rgba(0,0,0,0.05); }
    .prize-card.inactive { opacity: 0.6; grayscale: 80%; }
    .prize-color-bar { height: 8px; width: 100%; }
    .prize-content { padding: 1.5rem; }
    .prize-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    .prize-header h4 { margin: 0; font-size: 1.25rem; font-weight: 700; color: #334155; }

    .stats-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
    .stat label { display: block; font-size: 0.65rem; color: #94a3b8; text-transform: uppercase; font-weight: 800; margin-bottom: 0.4rem; letter-spacing: 0.05em; }
    .stat .value { font-size: 1.5rem; font-weight: 800; color: #334155; }
    .stat .value.low-stock { color: #ef4444; }

    /* Buttons */
    .claim-btn { background: #7c3aed; color: white !important; border: none; padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.8rem; font-weight: 700; cursor: pointer; transition: background 0.2s; }
    .claim-btn:hover { background: #6d28d9; }
    .unclaim-btn { background: #f8fafc; color: #64748b !important; border: 1px solid #e2e8f0; padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.8rem; font-weight: 700; cursor: pointer; }
    .edit-btn { width: 100%; background: #fdf4ff; color: #a21caf; border: 1px solid #fae8ff; padding: 0.75rem; border-radius: 10px; font-weight: 700; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; }
    .edit-btn:hover { background: #fae8ff; }

    /* Modal */
    .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(8px); display: flex; justify-content: center; align-items: center; z-index: 1000; }
    .modal-card { background: white; width: 100%; max-width: 480px; border-radius: 20px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); overflow: hidden; animation: zoomIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
    .modal-header { padding: 1.5rem; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
    .modal-header h3 { font-weight: 800; color: #1e293b !important; margin:0; }
    .close-btn { background: #f1f5f9; border: none; width: 32px; height: 32px; border-radius: 50%; font-size: 1.25rem; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
    .close-btn:hover { background: #e2e8f0; }
    .modal-body { padding: 2rem; }
    .form-group { margin-bottom: 1.5rem; }
    .form-group label { display: block; font-size: 0.9rem; color: #475569 !important; margin-bottom: 0.6rem; font-weight: 700; }
    .form-input { width: 100%; padding: 0.85rem; border: 2px solid #f1f5f9; border-radius: 12px; font-size: 1rem; color: #1e293b; background: #f8fafc; transition: border-color 0.2s; }
    .form-input:focus { outline: none; border-color: #7c3aed; background: white; }
    .help-text { font-size: 0.75rem; color: #94a3b8; margin-top: 0.4rem; }
    .modal-footer { padding: 1.5rem; background: #f8fafc; display: flex; justify-content: flex-end; gap: 1rem; }
    .secondary-btn { background: white; color: #64748b !important; border: 1px solid #e2e8f0; padding: 0.8rem 1.5rem; border-radius: 10px; font-weight: 700; cursor: pointer; }
    .primary-btn-save { background: #7c3aed; color: white !important; border: none; padding: 0.8rem 1.8rem; border-radius: 10px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 6px -1px rgba(124, 58, 237, 0.3); }

    /* Toggle Switch */
    .switch { position: relative; display: inline-block; width: 44px; height: 24px; }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #e2e8f0; transition: .4s; }
    .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    input:checked + .slider { background-color: #7c3aed; }
    input:checked + .slider:before { transform: translateX(20px); }
    .slider.round { border-radius: 34px; }
    .slider.round:before { border-radius: 50%; }

    @keyframes animate-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .animate-spin { animation: animate-spin 1s linear infinite; }
    @keyframes zoomIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }

    .text-slate-500 { color: #64748b !important; }
    .text-slate-700 { color: #334155 !important; }
    .text-slate-400 { color: #94a3b8 !important; }
  `]
})
export class AdminWheelManagementComponent implements OnInit {
  winners: any[] = [];
  prizes: any[] = [];
  activeTab = 'winners';
  selectedPrize: any = null;
  isLoading = false;
  editData = {
    remaining_quantity: 0,
    total_quantity: 0,
    weight: 0
  };

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.isLoading = true;
    this.cdr.detectChanges();

    // Artificial delay to show loading state if fast
    setTimeout(() => {
      this.loadWinners();
      this.loadPrizes();
    }, 400);
  }

  loadWinners() {
    this.api.getAll('wheel/winners').subscribe({
      next: (data) => {
        this.winners = data.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading winners:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadPrizes() {
    this.api.getAll('wheel/prizes').subscribe({
      next: (data) => {
        this.prizes = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading prizes:', err)
    });
  }

  toggleClaim(winner: any) {
    this.api.patch('wheel/winners', winner.id, { is_claimed: !winner.is_claimed }).subscribe(() => {
      this.loadWinners();
    });
  }

  togglePrizeActive(prize: any) {
    this.api.patch('wheel/prizes', prize.id, { is_active: !prize.is_active }).subscribe(() => {
      this.loadPrizes();
    });
  }

  editPrize(prize: any) {
    this.selectedPrize = prize;
    this.editData = {
      remaining_quantity: prize.remaining_quantity,
      total_quantity: prize.total_quantity,
      weight: prize.weight
    };
    this.cdr.detectChanges();
  }

  closeModal() {
    this.selectedPrize = null;
    this.cdr.detectChanges();
  }

  savePrize() {
    if (this.selectedPrize) {
      this.api.patch('wheel/prizes', this.selectedPrize.id, this.editData).subscribe(() => {
        this.loadPrizes();
        this.closeModal();
      });
    }
  }
}
