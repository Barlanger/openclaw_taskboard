// Firebase Configuration for Development
// 
// ⚠️ IMPORTANT: Replace the placeholder values below with your actual Firebase credentials
// 
// To get your Firebase credentials:
// 1. Go to https://console.firebase.google.com/
// 2. Create a project (or select an existing one)
// 3. Click the gear icon ⚙️ next to "Project Overview" → Project settings
// 4. Scroll down to "Your apps" section
// 5. Click the web app icon (</>) or select your existing web app
// 6. Copy the firebaseConfig values
// 
// For detailed setup instructions, see FIREBASE_SETUP.md in the project root.

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
