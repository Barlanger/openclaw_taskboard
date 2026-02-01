# TaskBoard_Me - Full Stack Task Management Application

A modern task management application built with Angular and Spring Boot, featuring a comprehensive dashboard with calendar and kanban board views.

## Project Structure

```
├── backend/              # Spring Boot backend service
│   ├── src/main/java/com/taskboard/backend/
│   │   ├── controller/  # REST API controllers
│   │   ├── model/       # JPA entities
│   │   ├── repository/  # Data access layer
│   │   ├── service/     # Business logic
│   │   └── config/      # Configuration classes
│   └── pom.xml          # Maven dependencies
│
├── src/app/             # Angular frontend application
│   ├── components/      # UI components
│   │   ├── dashboard/   # Main dashboard
│   │   ├── calendar-view/  # Calendar component
│   │   └── kanban-board/   # Kanban board with drag-drop
│   ├── models/          # TypeScript interfaces
│   └── services/        # HTTP services
│
└── README.md            # This file
```

## Features

### Frontend (Angular + TypeScript)
- ✅ **Dashboard** - Central hub with view toggles
- ✅ **Calendar View** - Monthly calendar showing tasks by due date
- ✅ **Kanban Board** - Drag-and-drop task management (TODO, IN_PROGRESS, DONE)
- ✅ **Responsive Design** - Clean, modern UI
- ✅ **Real-time Updates** - Tasks sync with backend

### Backend (Spring Boot + Java)
- ✅ **REST API** - Full CRUD operations for tasks
- ✅ **H2 Database** - In-memory database for development
- ✅ **CORS Configuration** - Configured for Angular frontend
- ✅ **Sample Data** - Pre-loaded with example tasks
- ✅ **JPA/Hibernate** - Object-relational mapping

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Java 17+
- Maven 3.6+

### Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

The backend will start on `http://localhost:8080`

**API Endpoints:**
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/{id}` - Get task by ID
- `GET /api/tasks/status/{status}` - Get tasks by status
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

**H2 Console:** `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:taskboarddb`
- Username: `sa`
- Password: (leave empty)

### Running the Frontend

1. From the project root directory, install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

The frontend will start on `http://localhost:4200`

## Development

### Frontend Development

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Code Scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

### Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Task Model

```typescript
{
  id?: number;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: string;          // ISO 8601 format
  createdAt?: string;        // Auto-generated
  updatedAt?: string;        // Auto-updated
}
```

## Technologies Used

### Frontend
- Angular 21.1.0
- TypeScript 5.9
- Angular CDK (for drag-and-drop)
- RxJS for reactive programming

### Backend
- Spring Boot 3.2.1
- Java 17
- Spring Data JPA
- H2 Database
- Lombok
- Maven

## Screenshots

### Dashboard
The main dashboard shows both calendar and kanban board views with toggle options.

### Calendar View
A monthly calendar displaying tasks organized by their due dates, color-coded by priority.

### Kanban Board
Drag-and-drop interface for managing tasks across different statuses (TODO, IN_PROGRESS, DONE).

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
