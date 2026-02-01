# NerdBlog - Developer Blogging Platform

A developer-focused blogging platform built with Angular 21 and Firebase, featuring Google authentication and a sleek dark theme perfect for nerds and developers.

![Home Page](https://github.com/user-attachments/assets/86eeacb6-2f67-444b-b13f-1063fd8c194b)

## Features

- **🔐 Google Authentication**: Secure login with Google accounts
- **📝 Markdown Support**: Write blog posts in Markdown with syntax highlighting
- **👨‍💼 Admin Panel**: Create, edit, and delete posts (admin only)
- **🎨 Dark Nerd Theme**: Eye-friendly dark theme with monospace fonts
- **📱 Responsive Design**: Works seamlessly on all devices
- **🚀 Angular 21**: Built with the latest Angular framework

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v10 or higher)
- A Firebase project with Authentication enabled

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Barlanger/openclaw_taskboard.git
cd openclaw_taskboard
```

2. Install dependencies:
```bash
npm install
```

3. **Set up Firebase** (REQUIRED):

   📖 **See [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for complete step-by-step instructions**
   
   Quick summary:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Google Authentication
   - Copy your Firebase configuration
   - Update `src/environments/environment.ts` with your credentials

4. Configure Admin Users (optional):

       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
     }
   };
   ```

5. Configure Admin Users:

   Edit `src/app/services/auth.service.ts` and add admin email addresses:
   
   ```typescript
   private adminEmails = ['your-admin-email@gmail.com'];
   ```

### Development Server

Run the development server:

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you change source files.

### Building for Production

Build the project:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Usage

### For Regular Users

1. Click "Login with Google" in the header
2. Sign in with your Google account
3. Browse and read blog posts
4. Click on any post to read the full content

### For Admin Users

1. Login with a Google account that's in the admin list
2. You'll see an "Admin" link in the navigation
3. Click "Admin" to create new posts
4. Use Markdown to format your posts
5. Tags should be comma-separated
6. Edit or delete posts from the post detail page

## Technology Stack

- **Frontend Framework**: Angular 21
- **Authentication**: Firebase Auth with Google Sign-in
- **Styling**: Custom CSS with dark theme
- **Storage**: In-memory (can be upgraded to Firestore)
- **Build Tool**: Angular CLI with Vite

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── admin/          # Admin post editor
│   │   ├── header/         # Navigation header
│   │   ├── home/           # Blog post list
│   │   └── post-detail/    # Individual post view
│   ├── guards/
│   │   └── admin.guard.ts  # Route protection
│   ├── models/
│   │   └── blog-post.model.ts
│   ├── services/
│   │   ├── auth.service.ts # Firebase authentication
│   │   └── blog.service.ts # Blog post management
│   └── environments/       # Firebase configuration
```

## Screenshots

### Home Page
![Home Page](https://github.com/user-attachments/assets/86eeacb6-2f67-444b-b13f-1063fd8c194b)

### Blog Post Detail
![Post Detail](https://github.com/user-attachments/assets/e952f83d-2da9-476b-ba28-5be3d222339f)

## Future Enhancements

- [ ] Persist blog posts to Firestore
- [ ] Add comments system
- [ ] Implement search functionality
- [ ] Add categories/filtering
- [ ] User profiles
- [ ] Social sharing
- [ ] RSS feed
- [ ] Draft posts
- [ ] Post scheduling

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
