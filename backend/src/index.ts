import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import postRoutes from './routes/posts';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', postRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'NerdBlog API is running' });
});

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to NerdBlog API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      posts: '/api/posts',
      postBySlug: '/api/posts/slug/:slug'
    }
  });
});

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📝 API endpoint: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
