# Docker Setup Guide

This project includes Docker and Docker Compose configurations for easy deployment of both the frontend and backend services.

## Prerequisites

- Docker installed (version 20.10 or higher)
- Docker Compose installed (version 2.0 or higher)

## Quick Start

To start both the frontend and backend with a single command:

```bash
docker-compose up
```

Or to run in detached mode (background):

```bash
docker-compose up -d
```

The services will be available at:
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:8080
- **H2 Database Console**: http://localhost:8080/h2-console

## Docker Commands

### Build and Start Services
```bash
docker-compose up --build
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Restart Services
```bash
docker-compose restart
```

### Remove Everything (including volumes)
```bash
docker-compose down -v
```

## Architecture

### Backend Service
- **Technology**: Spring Boot 3.4.1 with Java 17
- **Port**: 8080
- **Database**: H2 in-memory database
- **Build**: Multi-stage Docker build with Maven

### Frontend Service
- **Technology**: Angular 21 with Node.js 22
- **Port**: 4200 (mapped from container port 80)
- **Server**: Nginx
- **Build**: Multi-stage Docker build with npm
- **API Proxy**: Nginx proxies `/api/*` requests to the backend

### Network
- Both services run in the same Docker network (`taskboard-network`)
- Frontend can communicate with backend using the service name `backend`
- Health checks ensure services are running properly

## File Structure

```
.
├── docker-compose.yml          # Main orchestration file
├── Dockerfile                  # Frontend Docker build
├── nginx.conf                  # Nginx configuration for frontend
├── .dockerignore               # Files to exclude from frontend build
└── backend/
    ├── Dockerfile              # Backend Docker build
    └── .dockerignore           # Files to exclude from backend build
```

## Troubleshooting

### Port Already in Use
If you get a "port already in use" error:

```bash
# Check what's using the port
lsof -i :4200  # or :8080

# Change the port in docker-compose.yml
# For example, change "4200:80" to "4201:80"
```

### Backend Not Starting
Check the logs:
```bash
docker-compose logs backend
```

Common issues:
- Java version mismatch (requires Java 17)
- Maven build failures (check dependencies)

### Frontend Not Starting
Check the logs:
```bash
docker-compose logs frontend
```

Common issues:
- Node modules not installed properly
- Build errors in Angular application
- Nginx configuration issues

### Rebuild After Code Changes
```bash
docker-compose down
docker-compose up --build
```

## Production Considerations

For production deployment:

1. **Use environment variables** for sensitive configuration
2. **Replace H2 with a persistent database** (PostgreSQL, MySQL)
3. **Enable HTTPS** with proper SSL certificates
4. **Configure proper CORS** settings in the backend
5. **Set up logging and monitoring**
6. **Use Docker secrets** for sensitive data
7. **Implement proper backup strategies**

## Development vs Production

The current setup is optimized for development and testing. For production:

- Use proper reverse proxy (e.g., Traefik, Nginx proxy)
- Implement container orchestration (Kubernetes, Docker Swarm)
- Use external databases with volumes
- Implement proper logging and monitoring
- Set up CI/CD pipelines
- Use environment-specific configurations

## More Information

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Spring Boot with Docker](https://spring.io/guides/gs/spring-boot-docker/)
- [Angular Deployment](https://angular.io/guide/deployment)
