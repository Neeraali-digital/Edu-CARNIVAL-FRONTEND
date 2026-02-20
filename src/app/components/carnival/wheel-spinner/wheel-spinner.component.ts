import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import confetti from 'canvas-confetti';
import { ApiService } from '../../../services/api.service';

@Component({
    selector: 'app-wheel-spinner',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './wheel-spinner.html',
    styleUrl: './wheel-spinner.css',
})
export class WheelSpinnerComponent implements OnInit {
    rotationDegree = 0;
    isSpinning = false;
    prize: string | null = null;
    winningCode: string | null = null;
    selectedPrizeIndex = -1;
    hasSpun = false;

    prizes: any[] = [];

    constructor(
        private cdr: ChangeDetectorRef,
        private api: ApiService,
        private router: Router
    ) { }

    get isRegistered(): boolean {
        return typeof window !== 'undefined' && localStorage.getItem('edu_carnival_registered') === 'true';
    }

    ngOnInit() {
        const savedPrize = localStorage.getItem('edu_carnival_spin_prize');
        const savedCode = localStorage.getItem('edu_carnival_spin_code');
        if (savedPrize) {
            this.prize = savedPrize;
            this.winningCode = savedCode;
            this.hasSpun = true;
        }

        // Fetch active prizes from backend to build segments
        this.api.getAll('wheel/prizes').subscribe(data => {
            this.prizes = data.filter(p => p.is_active);
            this.cdr.detectChanges();
        });
    }

    mathCos(deg: number) {
        return Math.cos((deg * Math.PI) / 180);
    }

    mathSin(deg: number) {
        return Math.sin((deg * Math.PI) / 180);
    }

    spinWheel() {
        if (this.isSpinning || this.hasSpun || this.prizes.length === 0) return;

        // Double check local storage
        if (localStorage.getItem('edu_carnival_spin_prize')) {
            this.hasSpun = true;
            this.prize = localStorage.getItem('edu_carnival_spin_prize');
            this.winningCode = localStorage.getItem('edu_carnival_spin_code');
            return;
        }

        this.isSpinning = true;
        this.prize = null;
        this.winningCode = null;
        this.cdr.detectChanges();

        // Call backend to determine winner
        this.api.spinWheel().subscribe({
            next: (res) => {
                const prizeIndex = this.prizes.findIndex(p => p.name === res.prize);
                this.selectedPrizeIndex = prizeIndex !== -1 ? prizeIndex : 0;

                const sliceAngle = 360 / this.prizes.length;
                const extraSpins = 8 + Math.floor(Math.random() * 5);
                const segmentCenter = (this.selectedPrizeIndex + 0.5) * sliceAngle;
                const totalRotation = (extraSpins * 360) - segmentCenter;

                this.rotationDegree = totalRotation;
                this.cdr.detectChanges();

                setTimeout(() => {
                    this.isSpinning = false;
                    this.hasSpun = true;
                    this.prize = res.prize;
                    this.winningCode = res.code;

                    localStorage.setItem('edu_carnival_spin_prize', res.prize);
                    localStorage.setItem('edu_carnival_spin_code', res.code);

                    if (!this.prize?.toLowerCase().includes('better luck')) {
                        this.triggerBlast();
                    }
                    this.cdr.detectChanges();
                }, 5000);
            },
            error: (err) => {
                console.error(err);
                this.isSpinning = false;
                alert('Connection error. Please try again.');
                this.cdr.detectChanges();
            }
        });
    }

    copyCode() {
        if (this.winningCode) {
            navigator.clipboard.writeText(this.winningCode);
            alert('Code copied! Use it during registration.');
        }
    }

    goToRegistration() {
        this.router.navigate(['/registration/participant']);
    }

    private triggerBlast() {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        confetti({
            particleCount: 150, spread: 70, origin: { y: 0.6 },
            colors: ['#ec4899', '#fbbf24', '#2e1065'],
        });
    }
}
