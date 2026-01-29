import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-admin-stalls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stalls.component.html',
  styleUrl: './stalls.component.css'
})
export class AdminStallsComponent implements OnInit {
  stalls: any[] = [];
  showModal = false;
  editingStall = false;
  currentStall: any = {};
  selectedFile: File | null = null;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.loadStalls();
  }

  loadStalls() {
    this.api.getAll('stalls').subscribe(data => this.stalls = data);
  }

  openModal() {
    this.editingStall = false;
    this.currentStall = {};
    this.selectedFile = null;
    this.showModal = true;
  }

  editStall(stall: any) {
    this.editingStall = true;
    this.currentStall = { ...stall };
    this.selectedFile = null;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  saveStall() {
    const formData = new FormData();
    formData.append('title', this.currentStall.title);
    formData.append('price', this.currentStall.price); // Beware, if undefined
    if (this.currentStall.description) formData.append('description', this.currentStall.description);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.editingStall) {
      this.api.update('stalls', this.currentStall.id, formData).subscribe(() => {
        this.loadStalls();
        this.closeModal();
      });
    } else {
      this.api.create('stalls', formData).subscribe(() => {
        this.loadStalls();
        this.closeModal();
      });
    }
  }

  deleteStall(id: number) {
    if (confirm('Are you sure you want to delete this stall?')) {
      this.api.delete('stalls', id).subscribe(() => this.loadStalls());
    }
  }
}
