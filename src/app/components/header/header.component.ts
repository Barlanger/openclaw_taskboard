import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}

  async login() {
    try {
      await this.authService.signInWithGoogle();
    } catch (error: any) {
      console.error('Login failed:', error);
      
      // Show user-friendly error message
      if (error?.message?.includes('Firebase is not configured')) {
        alert(
          '⚙️ Firebase Configuration Required\n\n' +
          'The application needs to be configured with Firebase credentials to enable Google login.\n\n' +
          'If you\'re a developer, please see FIREBASE_SETUP.md for setup instructions.\n\n' +
          'If you\'re a user, please contact the application administrator.'
        );
      } else if (error?.code === 'auth/popup-blocked') {
        alert(
          '🚫 Popup Blocked\n\n' +
          'Your browser blocked the login popup. Please allow popups for this site and try again.'
        );
      } else if (error?.code === 'auth/popup-closed-by-user') {
        // User closed the popup, no need to show an error
        console.log('Login cancelled by user');
      } else {
        alert(
          '❌ Login Failed\n\n' +
          'An error occurred during login. Please check the console for details and try again.'
        );
      }
    }
  }

  async logout() {
    try {
      await this.authService.signOut();
    } catch (error) {
      console.error('Logout failed:', error);
      alert('An error occurred during logout. Please try again.');
    }
  }
}
