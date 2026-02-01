import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  name: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    if (!this.email) {
      this.errorMessage = 'Email is required';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.name).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.router.navigate(['/blog']);
        } else {
          this.errorMessage = 'Login failed';
        }
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Login failed: ' + (error.message || 'Unknown error');
      }
    });
  }

  quickLogin(email: string, name: string) {
    this.email = email;
    this.name = name;
    this.login();
  }
}
