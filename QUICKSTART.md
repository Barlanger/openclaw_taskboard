# Quick Start Guide - TaskBoard_Me

This guide will help you get the TaskBoard_Me application up and running in minutes.

## Prerequisites Check

**Option 1: Using mise (Recommended)**

If you have [mise](https://mise.jdx.dev/) installed, simply run:

```bash
mise install
```

This will automatically install all required tools (Node.js, Java, Maven) with the correct versions.

**Option 2: Manual Installation**

Before starting, ensure you have:
- ✅ Node.js 22+ (`node --version`)
- ✅ npm (`npm --version`)
- ✅ Java 21+ (`java --version`)
- ✅ Maven 3.6+ (`mvn --version`)

## Step 1: Start the Backend

Open a terminal and run:

```bash
cd backend
mvn spring-boot:run
```

**Expected Output:**
```
Started TaskboardApplication in X.XXX seconds
```

The backend will be available at: `http://localhost:8080`

**Sample API Test:**
```bash
curl http://localhost:8080/api/tasks
```

## Step 2: Start the Frontend

Open a **new terminal** (keep the backend running) and run:

```bash
npm install    # First time only
npm start
```

**Expected Output:**
```
Application bundle generation complete.
Watch mode enabled. Watching for file changes...
➜  Local:   http://localhost:4200/
```

The frontend will be available at: `http://localhost:4200`

## Step 3: Explore the Application

1. **Open your browser** to `http://localhost:4200`

2. **Dashboard Features:**
   - Toggle between "Both Views", "Kanban", or "Calendar" views
   - See 8 pre-loaded sample tasks
   
3. **Calendar View:**
   - Navigate months with arrow buttons
   - See tasks organized by due date
   - Color-coded by priority (Red=High, Orange=Medium, Green=Low)

4. **Kanban Board:**
   - Drag and drop tasks between columns
   - Three columns: TODO, IN_PROGRESS, DONE
   - Tasks automatically update in the backend

## Troubleshooting

### Backend Won't Start
- **Port 8080 already in use:**
  ```bash
  # Kill process on port 8080
  lsof -ti:8080 | xargs kill -9  # Mac/Linux
  netstat -ano | findstr :8080  # Windows
  ```
- **Maven dependencies fail:**
  ```bash
  mvn clean install
  ```

### Frontend Won't Start
- **Port 4200 already in use:**
  ```bash
  # Kill process on port 4200
  lsof -ti:4200 | xargs kill -9  # Mac/Linux
  netstat -ano | findstr :4200  # Windows
  ```
- **npm install fails:**
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

### CORS Errors
- Ensure backend is running before frontend
- Check backend console for CORS configuration logs

## Next Steps

### Add a New Task via API

```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My New Task",
    "description": "Task description",
    "status": "TODO",
    "priority": "HIGH",
    "dueDate": "2024-02-15T10:00:00"
  }'
```

### View H2 Database Console

1. Navigate to: `http://localhost:8080/h2-console`
2. Login with:
   - JDBC URL: `jdbc:h2:mem:taskboarddb`
   - Username: `sa`
   - Password: (leave empty)
3. Run SQL queries:
   ```sql
   SELECT * FROM TASKS;
   ```

### Development Mode

Both applications support hot-reload:
- **Backend:** Make code changes, Maven will rebuild automatically
- **Frontend:** Make code changes, browser will auto-refresh

## Stopping the Application

1. **Stop Frontend:** Press `Ctrl+C` in the frontend terminal
2. **Stop Backend:** Press `Ctrl+C` in the backend terminal

## What You've Built

✅ Full-stack task management application  
✅ RESTful API with Spring Boot  
✅ Modern Angular frontend with TypeScript  
✅ Drag-and-drop kanban board  
✅ Interactive calendar view  
✅ Real-time task synchronization  
✅ Priority and status management  
✅ Responsive design  

Enjoy using TaskBoard_Me! 🚀
