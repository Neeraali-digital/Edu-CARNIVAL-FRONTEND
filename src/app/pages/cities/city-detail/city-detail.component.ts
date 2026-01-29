import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
    selector: 'app-city-detail',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './city-detail.html',
    styleUrl: './city-detail.component.css',
})
export class CityDetailComponent implements OnInit {
    city: any;

    constructor(private route: ActivatedRoute, private api: ApiService, private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const cityId = params['id'];
            console.log('City ID from route:', cityId);
            this.api.getOne('cities', cityId).subscribe({
                next: (data) => {
                    console.log('City Data received:', data);
                    this.city = data;
                    this.cdr.detectChanges();
                },
                error: (err) => {
                    console.error('Error fetching city details:', err);
                }
            });
        });
    }
}
