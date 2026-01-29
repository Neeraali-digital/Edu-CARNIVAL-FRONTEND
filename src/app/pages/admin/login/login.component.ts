import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Admin Login</h2>
        <p class="subtitle">Welcome to Edu Carnival Dashboard</p>
        <form #loginForm="ngForm" (ngSubmit)="login()">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" [(ngModel)]="username" name="username" required #user="ngModel">
             <div *ngIf="user.invalid && (user.dirty || user.touched)" class="text-red-400 text-xs mt-1" style="color: #ff4d4d;">
                Username is required.
             </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" [(ngModel)]="password" name="password" required #pass="ngModel">
             <div *ngIf="pass.invalid && (pass.dirty || pass.touched)" class="text-red-400 text-xs mt-1" style="color: #ff4d4d;">
                Password is required.
             </div>
          </div>
          <button type="submit" class="login-btn" [disabled]="!loginForm.form.valid || isSubmitting" [style.opacity]="(!loginForm.form.valid || isSubmitting) ? '0.6' : '1'">
            {{ isSubmitting ? 'Logging in...' : 'Login' }}
          </button>
          <p *ngIf="error" class="error">{{ error }}</p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-image: url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
      background-size: cover;
      background-position: center;
      position: relative;
    }
    .login-container::before {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(26, 11, 46, 0.85); /* Dark overlay */
      backdrop-filter: blur(5px);
    }
    .login-card {
      position: relative;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      padding: 3rem;
      border-radius: 20px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.3);
      border: 1px solid rgba(255, 255, 255, 0.2);
      width: 100%;
      max-width: 420px;
      text-align: center;
    }
    h2 { 
      margin-bottom: 0.5rem; 
      color: white; 
      font-family: 'Outfit', sans-serif; 
      font-weight: 700;
      font-size: 2rem;
    }
    .subtitle {
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 2.5rem;
      font-size: 0.9rem;
    }
    .form-group { margin-bottom: 1.5rem; text-align: left; }
    label { 
      display: block; 
      margin-bottom: 0.5rem; 
      color: rgba(255, 255, 255, 0.9); 
      font-size: 0.9rem;
      font-weight: 500; 
    }
    input { 
      width: 100%; 
      padding: 1rem; 
      border: 1px solid rgba(255, 255, 255, 0.2); 
      border-radius: 10px; 
      background: rgba(255, 255, 255, 0.05);
      color: white;
      font-size: 1rem;
      transition: all 0.3s;
    }
    input:focus { 
      border-color: #ff007f; 
      background: rgba(255, 255, 255, 0.1);
      outline: none; 
      box-shadow: 0 0 15px rgba(255, 0, 127, 0.3); 
    }
    .login-btn { 
      width: 100%; 
      padding: 1rem; 
      margin-top: 1rem;
      background: linear-gradient(135deg, #ff007f 0%, #bf00ff 100%); 
      color: white; 
      border: none; 
      border-radius: 10px; 
      cursor: pointer;
      font-weight: 600;
      font-size: 1.1rem;
      transition: all 0.3s;
      box-shadow: 0 5px 15px rgba(255, 0, 127, 0.4);
    }
    .login-btn:hover { 
      transform: translateY(-2px); 
      box-shadow: 0 8px 20px rgba(255, 0, 127, 0.6);
    }
    .error { 
      color: #ff4d4d; 
      background: rgba(255, 77, 77, 0.1);
      padding: 0.75rem;
      border-radius: 8px;
      margin-top: 1.5rem; 
      font-size: 0.9rem; 
      border: 1px solid rgba(255, 77, 77, 0.2);
    }
  `]
})
export class AdminLoginComponent {
  username = '';
  password = '';
  error = '';

  isSubmitting = false;

  constructor(private router: Router, private api: ApiService) { }

  login() {
    this.isSubmitting = true;
    this.api.login(this.username, this.password).subscribe({
      next: (res: any) => {
        if (res.is_superuser) {
          localStorage.setItem('isAdmin', 'true');
          localStorage.setItem('token', res.token);
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.error = 'Access denied. Administrator privileges required.';
          this.isSubmitting = false;
        }
      },
      error: (err) => {
        console.error(err);
        this.error = 'Invalid credentials. Please try again.';
        this.isSubmitting = false;
      }
    });
  }
}
