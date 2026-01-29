import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ToastService } from '../../../services/toast.service';

@Component({
    selector: 'app-admin-program-schedule',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './program-schedule.component.html',
    styleUrl: './program-schedule.component.css'
})
export class AdminProgramScheduleComponent implements OnInit {
    programs: any[] = [];
    cities: any[] = [];
    showModal = false;
    isSubmitting = false;

    newItem = {
        city: '',
        title: '',
        time: '',
        description: ''
    };

    constructor(
        private api: ApiService,
        private toast: ToastService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.loadData();
        this.api.getAll('cities').subscribe(data => this.cities = data);
    }

    loadData() {
        this.api.getAll('program-details').subscribe({
            next: (data) => {
                // Manually map city names if backend doesn't populate city_details in simple ViewSet
                // Or better, fetch cities and join. 
                // Ideally backend serializer should have city_details. 
                // Let's assume standard ModelSerializer returns city ID. 
                // We will join with this.cities in template or here.

                // To be safe, let's wait for cities then map
                if (this.cities.length === 0) {
                    this.api.getAll('cities').subscribe(cities => {
                        this.cities = cities;
                        this.processPrograms(data);
                    });
                } else {
                    this.processPrograms(data);
                }
            }
        });
    }

    processPrograms(data: any[]) {
        this.programs = data.map(item => {
            const city = this.cities.find(c => c.id === item.city);
            return { ...item, city_details: city };
        });
        this.cdr.detectChanges();
    }

    openModal() {
        this.showModal = true;
        this.newItem = { city: '', title: '', time: '', description: '' };
    }

    closeModal() {
        this.showModal = false;
    }

    saveProgram() {
        if (!this.newItem.city || !this.newItem.title) return;

        this.isSubmitting = true;
        this.api.create('program-details', this.newItem).subscribe({
            next: () => {
                this.toast.success('Event added successfully!');
                this.closeModal();
                this.loadData();
                this.isSubmitting = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error(err);
                this.toast.error('Failed to add event.');
                this.isSubmitting = false;
            }
        });
    }

    deleteProgram(id: any) {
        if (!confirm('Are you sure you want to delete this event?')) return;

        this.api.delete('program-details', id).subscribe({
            next: () => {
                this.toast.success('Event deleted.');
                this.loadData();
            }
        });
    }
}
