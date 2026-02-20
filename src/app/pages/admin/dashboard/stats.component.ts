import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core'; // Core imports
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard-stats',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div class="stats-grid">
      <div class="stat-card">
        <h4>Total Cities</h4>
        <p class="number">{{ cityCount }}</p>
      </div>
      <div class="stat-card">
        <h4>Exhibitor Regs</h4>
        <p class="number">{{ exhibitorCount }}</p>
      </div>
      <div class="stat-card">
        <h4>Participant Regs</h4>
        <p class="number">{{ participantCount }}</p>
      </div>
      <div class="stat-card">
        <h4>Inquiries</h4>
        <p class="number">{{ inquiryCount }}</p>
      </div>
      <div class="stat-card">
        <h4>Wheel Winners</h4>
        <p class="number">{{ winnerCount }}</p>
      </div>
      <div class="stat-card">
        <h4>Prizes Left</h4>
        <p class="number">{{ prizeCount }}</p>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="charts-container mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="chart-card p-6 bg-white rounded-xl shadow-lg">
        <h3 class="text-xl font-bold mb-4 text-[#1a0b2e]">Registration Overview</h3>
        <canvas baseChart
          [data]="barChartData"
          [options]="barChartOptions"
          [type]="'bar'">
        </canvas>
      </div>
      
      <div class="chart-card p-6 bg-white rounded-xl shadow-lg">
        <h3 class="text-xl font-bold mb-4 text-[#1a0b2e]">Activity Distribution</h3>
        <canvas baseChart
          [data]="pieChartData"
          [options]="pieChartOptions"
          [type]="'doughnut'">
        </canvas>
      </div>
    </div>
  `,
  styles: [`
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; }
    .stat-card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); transition: transform 0.2s; }
    .stat-card:hover { transform: translateY(-5px); }
    h4 { color: #7f8c8d; margin-bottom: 0.5rem; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px; }
    .number { font-size: 2.5rem; font-weight: bold; color: #1a0b2e; }
    .charts-container { margin-top: 2rem; }
    .chart-card { background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
  `]
})
export class DashboardStatsComponent implements OnInit {
  cityCount = 0;
  exhibitorCount = 0;
  participantCount = 0;
  inquiryCount = 0;
  winnerCount = 0;
  prizeCount = 0;

  // Bar Chart
  public barChartOptions: ChartOptions<'bar'> = { responsive: true };
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Exhibitors', 'Participants', 'Inquiries'],
    datasets: [{ data: [0, 0, 0], label: 'Total Count', backgroundColor: ['#ff007f', '#764ba2', '#3498db'] }]
  };

  // Pie Chart
  public pieChartOptions: ChartOptions<'doughnut'> = { responsive: true };
  public pieChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Cities', 'Stalls', 'Gallery'],
    datasets: [{ data: [0, 0, 0], backgroundColor: ['#ff007f', '#764ba2', '#f1c40f'] }]
  };

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.api.getAll('dashboard-stats').subscribe(data => {
      // Since getAll appends '/', and our url is 'dashboard-stats/', it might be 'dashboard-stats//' or work if backend handles it
      // Ideally use getOne or custom http.get but getAll works if endpoint is correct
      // The API returns an object, getAll expects array usually in my code but here it's any.
      // Let's assume api.getAll does http.get(url/)

      // Actually, the api service might be expecting an array if typed.
      // Let's just cast data as any.
      const stats = data as any;

      this.cityCount = stats.total_cities || 0;
      this.exhibitorCount = stats.exhibitor_regs || 0;
      this.participantCount = stats.participant_regs || 0;
      this.inquiryCount = stats.inquiries || 0;
      this.winnerCount = stats.total_winners || 0;
      this.prizeCount = stats.available_prizes || 0;

      this.barChartData.datasets[0].data = [
        this.exhibitorCount,
        this.participantCount,
        this.inquiryCount
      ];

      this.pieChartData.datasets[0].data = [
        this.cityCount,
        stats.total_stalls || 0,
        stats.total_gallery || 0
      ];

      // Trigger chart update
      this.chart?.update();
      this.cdr.detectChanges();
    });
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
}
