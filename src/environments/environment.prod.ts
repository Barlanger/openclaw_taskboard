// Firebase Configuration for Production
// 
// ⚠️ IMPORTANT: Replace the placeholder values below with your actual Firebase credentials
// 
// For production, you may want to use a separate Firebase project from development,
// or you can use the same project. Security rules and authorized domains should be
// configured appropriately for your production environment.
// 
// For setup instructions, see FIREBASE_SETUP.md in the project root.

export const environment = {
  production: true,
  firebase: {
    // 🔑 Replace these placeholder values with your actual Firebase configuration
    apiKey: "YOUR_API_KEY",                      // Example: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX"
    authDomain: "YOUR_AUTH_DOMAIN",              // Example: "your-project.firebaseapp.com"
    projectId: "YOUR_PROJECT_ID",                // Example: "your-project"
    storageBucket: "YOUR_STORAGE_BUCKET",        // Example: "your-project.appspot.com"
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Example: "123456789012"
    appId: "YOUR_APP_ID"                         // Example: "1:123456789012:web:abc123"
  }
};
