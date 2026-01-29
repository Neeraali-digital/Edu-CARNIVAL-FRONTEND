import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './components/common/header/header';
import { FooterComponent } from './components/common/footer/footer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'edu-carnival';
  isAdminRoute = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => { // Listen for route changes
      if (event instanceof NavigationEnd) {
        this.isAdminRoute = event.url.startsWith('/admin');
      }
    });
  }
}
