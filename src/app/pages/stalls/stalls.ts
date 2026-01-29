import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-stalls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stalls.html',
  styleUrl: './stalls.css',
})
export class StallsComponent implements OnInit {
  stalls: any[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAll('stalls').subscribe(data => {
      this.stalls = data;
    });
  }
}
