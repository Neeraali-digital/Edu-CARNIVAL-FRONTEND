import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import confetti from 'canvas-confetti';

@Component({
    selector: 'app-wheel-spinner',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './wheel-spinner.html',
    styleUrl: './wheel-spinner.css',
})
export class WheelSpinnerComponent {
    rotationDegree = 0;
    isSpinning = false;
    prize: string | null = null;
    selectedPrizeIndex = -1;

    mathCos(deg: number) {
        return Math.cos((deg * Math.PI) / 180);
    }

    mathSin(deg: number) {
        return Math.sin((deg * Math.PI) / 180);
    }

    prizes = [
        { name: 'FREE PASS', color: '#ec4899' },
        { name: '50% OFF', color: '#2e1065' },
        { name: 'EDU KIT', color: '#fbbf24' },
        { name: 'VIP ACCESS', color: '#ec4899' },
        { name: 'STICKERS', color: '#2e1065' },
        { name: 'NOTEBOOK', color: '#fbbf24' },
        { name: 'MUG', color: '#ec4899' },
        { name: 'LUCKY KEY', color: '#2e1065' },
    ];

    spinWheel() {
        if (this.isSpinning) return;

        this.isSpinning = true;
        this.prize = null;

        // Pick a random prize index
        const prizeIndex = Math.floor(Math.random() * this.prizes.length);
        this.selectedPrizeIndex = prizeIndex;

        // Calculate rotation to land on the specific prize
        // Each slice is 45 degrees.
        // 0 index is at 0-45 deg (starting from top clockwise)
        // To land on index 'i', we need the pointer (top) to be at 'i * 45' deg relative to start.
        // So the wheel must rotate such that the start point moves to '- (i * 45 + 22.5)' deg relative to pointer.
        // Since we want positive rotation:
        const sliceAngle = 360 / this.prizes.length;
        const extraSpins = 8 + Math.floor(Math.random() * 5); // 8-12 full spins

        // Calculate degree to land in the middle of the slice
        const targetDegree = 360 - (prizeIndex * sliceAngle) - (sliceAngle / 2);
        const totalRotation = this.rotationDegree + (extraSpins * 360) + (targetDegree - (this.rotationDegree % 360));

        this.rotationDegree = totalRotation;

        // Wait for 3 seconds (animation duration)
        setTimeout(() => {
            this.isSpinning = false;
            this.prize = this.prizes[prizeIndex].name;
            this.triggerBlast();
        }, 3000);
    }

    private triggerBlast() {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            });
        }, 250);

        // Initial big blast
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ec4899', '#fbbf24', '#2e1065'],
        });
    }
}

