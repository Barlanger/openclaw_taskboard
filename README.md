# NerdBlog - Developer Blogging Platform

A full-stack developer-focused blogging platform with Angular 21 frontend, Node.js/Express backend, and MongoDB database.

## 🚀 Quick Start with Docker

The easiest way to run the complete application:

```bash
# Build and start all services (frontend, backend, database)
docker compose up --build

# Or run in detached mode
docker compose up -d
```

Then open your browser:
- **Frontend**: http://localhost
- **Backend API**: http://localhost:3000/api
- **API Health**: http://localhost:3000/health

To stop:
```bash
docker compose down
```

📖 **Full Docker documentation**: See [DOCKER_SETUP.md](DOCKER_SETUP.md)

## 📋 What's Included

### Frontend (Angular 21)
- Dark nerd-themed UI with monospace fonts
- Google authentication via Firebase
- Markdown blog post rendering
- Admin panel for content management
- Responsive design

### Backend (Node.js + Express + TypeScript)
- RESTful API for blog posts
- MongoDB integration with Mongoose
- CRUD operations for posts
- Health check endpoints

### Database (MongoDB)
- Persistent data storage
- Pre-initialized with sample blog posts
- Automatic health checks

## 🛠️ Development Setup

### Prerequisites
- Node.js 20+
- npm 10+

### Local Development (without Docker)

1. Install dependencies:
```bash
npm install --legacy-peer-deps
```

2. Start the development server:
```bash
ng serve
```

3. Open http://localhost:4200

### Firebase Setup

See [BLOG_README.md](BLOG_README.md) for detailed Firebase authentication setup instructions.

## 🐳 Docker Architecture

```
┌──────────────┐
│  Frontend    │ Port 80 (Nginx + Angular)
│  (Docker)    │
└──────┬───────┘
       │ 
       │ API calls
       │
┌──────▼───────┐    ┌─────────────┐
│  Backend API │───▶│  MongoDB    │
│  Express/TS  │    │  Database   │
│  Port 3000   │    │ Port 27017  │
└──────────────┘    └─────────────┘
```

## 📚 Documentation

- **[BLOG_README.md](BLOG_README.md)** - Blog features and Firebase setup
- **[DOCKER_SETUP.md](DOCKER_SETUP.md)** - Complete Docker guide with troubleshooting
- **API Endpoints** - See DOCKER_SETUP.md for full API documentation

## 🧪 Testing

To execute unit tests with the [Vitest](https://vitest.dev/) test runner:

```bash
ng test
```

## 📦 Building for Production

### With Docker (Recommended)
```bash
docker compose up --build
```

### Without Docker
```bash
ng build
```

Build artifacts will be in the `dist/` directory.

## 🌟 Features

- ✅ Google Authentication
- ✅ Markdown blog posts with syntax highlighting  
- ✅ Admin-only content management
- ✅ RESTful backend API
- ✅ MongoDB persistence
- ✅ Dark developer theme
- ✅ Fully Dockerized
- ✅ Health checks and auto-restart

## 📖 Additional Resources

For more information on using the Angular CLI, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
