import { Injectable, signal } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = getAuth(initializeApp(environment.firebase));
  public currentUser = signal<User | null>(null);
  public isAdmin = signal<boolean>(false);
  
  // Admin emails list - in production, this should be in a database
  private adminEmails = ['admin@example.com'];

  constructor() {
    // Check if Firebase is properly configured
    this.checkFirebaseConfig();
    
    // Listen to auth state changes
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser.set(user);
      if (user && user.email) {
        this.isAdmin.set(this.adminEmails.includes(user.email));
      } else {
        this.isAdmin.set(false);
      }
    });
  }

  private checkFirebaseConfig(): void {
    const config = environment.firebase;
    if (!config.apiKey || config.apiKey === 'YOUR_API_KEY') {
      console.error(
        '🔥 Firebase Configuration Error!\n\n' +
        'Firebase is not properly configured. Please follow these steps:\n\n' +
        '1. Create a Firebase project at https://console.firebase.google.com/\n' +
        '2. Enable Google Authentication in Firebase Console\n' +
        '3. Copy your Firebase configuration\n' +
        '4. Update src/environments/environment.ts with your Firebase credentials\n\n' +
        'For detailed instructions, see FIREBASE_SETUP.md in the project root.\n'
      );
    }
  }

  async signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    try {
      // Check configuration before attempting login
      if (!environment.firebase.apiKey || environment.firebase.apiKey === 'YOUR_API_KEY') {
        throw new Error(
          'Firebase is not configured. Please update src/environments/environment.ts with your Firebase credentials. ' +
          'See FIREBASE_SETUP.md for detailed instructions.'
        );
      }
      
      await signInWithPopup(this.auth, provider);
    } catch (error) {
      console.error('Error signing in with Google', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Error signing out', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  isUserAdmin(): boolean {
    return this.isAdmin();
  }
}
