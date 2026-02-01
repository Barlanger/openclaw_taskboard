# TaskBoard Backend

Spring Boot backend service for the TaskBoard application.

## Technologies

- Java 21
- Spring Boot 4.0.2
- Spring Data JPA
- H2 Database (in-memory)
- Maven

## Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run using Maven:
   ```bash
   mvn spring-boot:run
   ```

The backend will start on `http://localhost:8080`

## API Endpoints

### Tasks API

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/{id}` - Get task by ID
- `GET /api/tasks/status/{status}` - Get tasks by status
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

## H2 Database Console

Access the H2 console at: `http://localhost:8080/h2-console`

- JDBC URL: `jdbc:h2:mem:taskboarddb`
- Username: `sa`
- Password: (leave empty)

## Task Model

```json
{
  "id": 1,
  "title": "Task Title",
  "description": "Task Description",
  "status": "TODO|IN_PROGRESS|DONE",
  "priority": "LOW|MEDIUM|HIGH",
  "dueDate": "2024-01-01T12:00:00",
  "createdAt": "2024-01-01T12:00:00",
  "updatedAt": "2024-01-01T12:00:00"
}
```
