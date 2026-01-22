import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-wheel-spinner',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './wheel-spinner.html',
    styleUrl: './wheel-spinner.css'
})
export class WheelSpinnerComponent {
    rotationDegree = 0;
    isSpinning = false;
    prize: string | null = null;

    prizes = [
        '20% Discount', 'Free Merch', 'VIP Pass', 'Coffee Mug',
        'Notebook', 'Sticker Pack', 'Scholarship Info', 'Try Again'
    ];

    spinWheel() {
        if (this.isSpinning) return;

        this.isSpinning = true;
        this.prize = null;

        // Calculate new rotation (at least 3 full spins)
        const spins = 5;
        const randomDegree = Math.floor(Math.random() * 360);
        const totalRotation = (spins * 360) + randomDegree;

        this.rotationDegree += totalRotation;

        // Simulate outcome based on randomDegree after animation
        setTimeout(() => {
            this.isSpinning = false;
            // Simple prize logic (just random for visual effect)
            this.prize = this.prizes[Math.floor(Math.random() * this.prizes.length)];
        }, 4000); // Match CSS transition duration
    }
}
