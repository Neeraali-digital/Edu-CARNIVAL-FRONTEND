import { Component, OnInit, ChangeDetectorRef, Renderer2, Inject, OnDestroy } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
import { ApiService } from '../../../services/api.service';
import { CITIES } from '../../../data/cities';

@Component({
    selector: 'app-city-detail',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './city-detail.html',
    styleUrl: './city-detail.component.css',
})
export class CityDetailComponent implements OnInit, OnDestroy {
    city: any;
    safeMapUrl: SafeResourceUrl | null = null;
    private scriptElement: any;

    constructor(
        private route: ActivatedRoute, 
        private api: ApiService, 
        private cdr: ChangeDetectorRef,
        private sanitizer: DomSanitizer,
        private renderer: Renderer2,
        private titleService: Title,
        @Inject(DOCUMENT) private document: Document
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const slug = params['id'];
            this.city = CITIES.find(c => c.slug === slug);
            if (this.city && this.city.map_url) {
                this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.city.map_url);
            }

            if (this.city) {
                this.titleService.setTitle(`${this.city.name} | Edu Carnival 2026`);
            }

            // Inject Schema if available
            this.removeSchema();
            if (this.city && this.city.schema) {
                this.injectSchema(this.city.schema);
            }

            this.cdr.detectChanges();
        });
    }

    ngOnDestroy() {
        this.removeSchema();
    }

    private injectSchema(schema: any) {
        this.scriptElement = this.renderer.createElement('script');
        this.renderer.setAttribute(this.scriptElement, 'type', 'application/ld+json');
        this.renderer.setProperty(this.scriptElement, 'text', JSON.stringify(schema));
        this.renderer.appendChild(this.document.head, this.scriptElement);
    }

    private removeSchema() {
        if (this.scriptElement) {
            this.renderer.removeChild(this.document.head, this.scriptElement);
            this.scriptElement = null;
        }
    }
}
