import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastMessage } from '../../../services/toast.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {
    toast: ToastMessage | null = null;
    private subscription: Subscription | null = null;
    isVisible = false;

    constructor(private toastService: ToastService, private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.subscription = this.toastService.toast$.subscribe(toast => {
            console.log('Toast received:', toast); // Debug log
            if (toast) {
                this.toast = toast;
                this.isVisible = true;
            } else {
                this.isVisible = false;
            }
            this.cdr.detectChanges(); // Force update
        });
    }

    close() {
        this.isVisible = false;
        this.toastService.clear();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
