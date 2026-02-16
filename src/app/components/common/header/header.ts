import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  isMobileMenuOpen = false;
  activeMobileSection: string | null = null;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (!this.isMobileMenuOpen) {
      this.activeMobileSection = null;
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.activeMobileSection = null;
  }

  toggleMobileSection(section: string) {
    this.activeMobileSection = this.activeMobileSection === section ? null : section;
  }
}
