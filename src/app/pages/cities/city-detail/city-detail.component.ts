import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from '../../../services/api.service';
import { CITIES } from '../../../data/cities';

@Component({
    selector: 'app-city-detail',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './city-detail.html',
    styleUrl: './city-detail.component.css',
})
export class CityDetailComponent implements OnInit {
    city: any;
    safeMapUrl: SafeResourceUrl | null = null;

    constructor(
        private route: ActivatedRoute, 
        private api: ApiService, 
        private cdr: ChangeDetectorRef,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const slug = params['id'];
            this.city = CITIES.find(c => c.slug === slug);
            if (this.city && this.city.map_url) {
                this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.city.map_url);
            }
            this.cdr.detectChanges();
        });
    }
}
