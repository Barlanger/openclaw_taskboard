import { Router } from 'express';
import {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postController';

const router = Router();

// Public routes
router.get('/posts', getAllPosts);
router.get('/posts/slug/:slug', getPostBySlug);

// Protected routes
// TODO: Add authentication middleware in production
// These endpoints should verify Firebase tokens or implement another auth strategy
// Example: router.post('/posts', authenticateToken, createPost);
router.post('/posts', createPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);

export default router;
