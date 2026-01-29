import { Component, OnInit } from '@angular/core';
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

    constructor(private route: ActivatedRoute, private api: ApiService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const cityId = params['id'];
            this.api.getOne('cities', cityId).subscribe(data => {
                this.city = data;
            });
        });
    }
}
