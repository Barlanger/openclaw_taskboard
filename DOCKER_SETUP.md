# Docker Setup Guide for NerdBlog

This guide explains how to run the NerdBlog application using Docker and Docker Compose.

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)

## Architecture

The application consists of three services:

1. **Frontend** - Angular 21 application served by Nginx (Port 80)
2. **Backend** - Node.js/Express API (Port 3000)
3. **MongoDB** - Database for storing blog posts (Port 27017)

```
┌─────────────┐
│  Frontend   │  Port 80
│  (Angular)  │
└──────┬──────┘
       │
       ├─────────────┐
       │             │
┌──────▼──────┐ ┌───▼────────┐
│   Backend   │ │  MongoDB   │
│  (Express)  │ │            │
│  Port 3000  │ │ Port 27017 │
└─────────────┘ └────────────┘
```

## Quick Start

### 1. Build and Start All Services

```bash
docker-compose up --build
```

This command will:
- Build the frontend Docker image
- Build the backend Docker image
- Pull the MongoDB image
- Start all three services
- Initialize the database with sample posts

### 2. Access the Application

Once all services are running:

- **Frontend**: http://localhost
- **Backend API**: http://localhost:3000/api
- **API Health Check**: http://localhost:3000/health
- **MongoDB**: mongodb://localhost:27017

## Docker Compose Commands

### Start services in detached mode (background)
```bash
docker-compose up -d
```

### Stop all services
```bash
docker-compose down
```

### Stop and remove volumes (⚠️ deletes all data)
```bash
docker-compose down -v
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f mongodb
```

### Rebuild services
```bash
# Rebuild all
docker-compose build

# Rebuild specific service
docker-compose build frontend
docker-compose build backend
```

### Restart a service
```bash
docker-compose restart frontend
docker-compose restart backend
docker-compose restart mongodb
```

## Development Workflow

### Making Frontend Changes

1. Make your changes to the Angular code
2. Rebuild the frontend:
   ```bash
   docker-compose build frontend
   ```
3. Restart the frontend service:
   ```bash
   docker-compose up -d frontend
   ```

### Making Backend Changes

1. Make your changes to the backend code
2. Rebuild the backend:
   ```bash
   docker-compose build backend
   ```
3. Restart the backend service:
   ```bash
   docker-compose up -d backend
   ```

## Environment Variables

### Backend (.env)

Create a `backend/.env` file for custom configuration:

```env
PORT=3000
MONGODB_URI=mongodb://mongodb:27017/nerdblog
NODE_ENV=production
```

### Frontend

Firebase configuration is in `src/environments/environment.ts`

## Database Management

### Access MongoDB Shell

```bash
docker exec -it nerdblog-mongodb mongosh nerdblog
```

### Sample MongoDB Commands

```javascript
// List all posts
db.blogposts.find()

// Count posts
db.blogposts.countDocuments()

// Find by slug
db.blogposts.findOne({ slug: 'welcome-to-nerdblog' })

// Delete all posts
db.blogposts.deleteMany({})
```

### Backup Database

```bash
# Create backup
docker exec nerdblog-mongodb mongodump --db=nerdblog --out=/data/backup

# Copy backup to host
docker cp nerdblog-mongodb:/data/backup ./mongodb-backup
```

### Restore Database

```bash
# Copy backup to container
docker cp ./mongodb-backup nerdblog-mongodb:/data/restore

# Restore from backup
docker exec nerdblog-mongodb mongorestore --db=nerdblog /data/restore/nerdblog
```

## API Endpoints

### Public Endpoints

- `GET /api/posts` - Get all blog posts
- `GET /api/posts/slug/:slug` - Get post by slug

### Protected Endpoints

- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Example API Calls

```bash
# Get all posts
curl http://localhost:3000/api/posts

# Get post by slug
curl http://localhost:3000/api/posts/slug/welcome-to-nerdblog

# Create new post (requires authentication in production)
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My New Post",
    "content": "Post content in markdown",
    "author": "John Doe",
    "authorEmail": "john@example.com",
    "tags": ["tech", "blog"],
    "slug": "my-new-post"
  }'
```

## Troubleshooting

### Port Already in Use

If you get a "port already in use" error:

```bash
# Check what's using the port
lsof -i :80
lsof -i :3000
lsof -i :27017

# Kill the process or change the port in docker-compose.yml
```

### Container Won't Start

```bash
# Check container logs
docker-compose logs [service-name]

# Check container status
docker-compose ps

# Restart from scratch
docker-compose down -v
docker-compose up --build
```

### Database Connection Issues

```bash
# Check if MongoDB is running
docker-compose ps mongodb

# Check MongoDB logs
docker-compose logs mongodb

# Test connection
docker exec nerdblog-mongodb mongosh --eval "db.adminCommand('ping')"
```

### Frontend Build Issues

```bash
# Clear Angular cache
rm -rf .angular

# Clear Docker build cache
docker-compose build --no-cache frontend
```

## Production Considerations

### Security

1. **Change default MongoDB credentials**
   ```yaml
   environment:
     MONGO_INITDB_ROOT_USERNAME: admin
     MONGO_INITDB_ROOT_PASSWORD: strongpassword
   ```

2. **Use environment variables for sensitive data**
3. **Enable authentication middleware on backend**
4. **Use HTTPS with SSL certificates**
5. **Set up proper CORS policies**

### Performance

1. **Use Docker volumes for persistent data**
2. **Configure resource limits**:
   ```yaml
   deploy:
     resources:
       limits:
         cpus: '1'
         memory: 512M
   ```

3. **Enable nginx caching**
4. **Use connection pooling for MongoDB**

### Monitoring

1. **Add health checks** (already configured)
2. **Set up logging aggregation**
3. **Monitor container resource usage**:
   ```bash
   docker stats
   ```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker images
        run: docker-compose build
      - name: Run tests
        run: docker-compose up -d && npm test
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [MongoDB Docker Image](https://hub.docker.com/_/mongo)
- [Nginx Docker Image](https://hub.docker.com/_/nginx)

## Support

For issues or questions, please open an issue on the GitHub repository.
