# Firebase Setup Guide for NerdBlog

This guide will help you set up Firebase Authentication for the NerdBlog application.

## Prerequisites

- A Google account
- Node.js installed on your machine

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter a project name (e.g., "NerdBlog" or "openclaw-taskboard")
4. (Optional) Enable Google Analytics if desired
5. Click **"Create project"** and wait for it to be created

## Step 2: Register Your Web App

1. In your Firebase project, click the **Web icon** (`</>`) to add a web app
2. Give your app a nickname (e.g., "NerdBlog Web")
3. Check **"Also set up Firebase Hosting"** if you plan to deploy to Firebase (optional)
4. Click **"Register app"**
5. **Important**: Copy the Firebase configuration object that appears. It will look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

## Step 3: Enable Google Authentication

1. In the Firebase Console, go to **Authentication** from the left menu
2. Click **"Get started"** if this is your first time
3. Go to the **"Sign-in method"** tab
4. Find **Google** in the list of providers
5. Click on **Google** to configure it
6. Toggle the **"Enable"** switch to ON
7. Select a **Project support email** (your email)
8. Click **"Save"**

## Step 4: Configure Your Application

### For Local Development

1. Open the file: `src/environments/environment.ts`

2. Replace the placeholder values with your actual Firebase configuration:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",        // From Firebase Console
    authDomain: "your-project.firebaseapp.com",             // From Firebase Console
    projectId: "your-project",                              // From Firebase Console
    storageBucket: "your-project.appspot.com",              // From Firebase Console
    messagingSenderId: "123456789012",                      // From Firebase Console
    appId: "1:123456789012:web:abcdef123456"               // From Firebase Console
  }
};
```

### For Production Deployment

1. Open the file: `src/environments/environment.prod.ts`

2. Add the same Firebase configuration (you can use the same project or create a separate production project):

```typescript
export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
  }
};
```

## Step 5: Set Up Admin Users (Optional)

To make certain users administrators who can create/edit posts:

1. Open `src/app/services/auth.service.ts`

2. Find the `adminEmails` array (around line 22):

```typescript
private adminEmails = ['admin@example.com'];
```

3. Replace with your Google email address(es):

```typescript
private adminEmails = ['your-email@gmail.com', 'another-admin@gmail.com'];
```

## Step 6: Test the Configuration

1. Start the development server:
```bash
npm start
```

2. Open your browser to `http://localhost:4200`

3. Click the **"Login with Google"** button

4. You should see a Google sign-in popup

5. Sign in with your Google account

6. If everything is configured correctly, you'll be logged in!

## Troubleshooting

### Error: "auth/api-key-not-valid"

**Problem**: The API key is still set to the placeholder value or is incorrect.

**Solution**: 
- Double-check that you copied the correct `apiKey` from Firebase Console
- Make sure there are no extra spaces or quotes
- Verify the file path: `src/environments/environment.ts`

### Error: "auth/unauthorized-domain"

**Problem**: Your localhost or deployment domain is not authorized in Firebase.

**Solution**:
1. Go to Firebase Console → Authentication → Settings → Authorized domains
2. Add your domain (for local development, `localhost` should already be there)
3. For production, add your deployment domain

### Google Sign-In Popup is Blocked

**Problem**: Browser is blocking the popup window.

**Solution**: 
- Allow popups for localhost in your browser settings
- Click the popup icon in the address bar to allow

### Can't See Firebase Configuration in Console

**Problem**: Can't find where to get the Firebase config.

**Solution**:
1. Go to Firebase Console
2. Click the gear icon (⚙️) next to "Project Overview"
3. Select "Project settings"
4. Scroll down to "Your apps" section
5. You'll see your web app with the configuration

## Security Best Practices

### 🔒 Important Security Notes

1. **API Key Exposure**: The Firebase API key in the client-side code is safe to expose publicly. It's designed for this purpose and is restricted by Firebase Security Rules and domain restrictions.

2. **Git Ignore**: While the API key can be public, some developers prefer to keep environment files private. The repository is already configured to work with the files committed, but you can add them to `.gitignore` if preferred.

3. **Domain Restrictions**: Firebase automatically restricts your API key to authorized domains only, which you configure in the Firebase Console.

4. **Security Rules**: Always implement proper Firebase Security Rules for Firestore if you add a database later.

## Need More Help?

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Firebase Console](https://console.firebase.google.com/)

## Summary Checklist

- [ ] Created a Firebase project
- [ ] Registered a web app
- [ ] Enabled Google authentication
- [ ] Copied Firebase configuration
- [ ] Updated `src/environments/environment.ts`
- [ ] Updated `src/environments/environment.prod.ts` (for production)
- [ ] Added your email to admin list (optional)
- [ ] Tested login functionality
- [ ] ✅ Everything working!
