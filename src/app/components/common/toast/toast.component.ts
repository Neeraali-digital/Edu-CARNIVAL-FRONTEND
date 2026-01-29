import { Component, OnInit, OnDestroy } from '@angular/core';
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

    constructor(private toastService: ToastService) { }

    ngOnInit() {
        this.subscription = this.toastService.toast$.subscribe(toast => {
            if (toast) {
                this.toast = toast;
                this.isVisible = true;
            } else {
                this.isVisible = false;
                // Wait for animation to finish before removing data? 
                // For simplicity, we just hide it.
            }
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
